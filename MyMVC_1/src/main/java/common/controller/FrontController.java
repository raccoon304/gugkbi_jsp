package common.controller;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
//>>> Servlet 3.0 부터 (톰캣버전 7.0 이후 부터 사용가능) 제공되는 Part 인터페이스를 이용해 파일업로드를 구현한다 <<< //
/*
 Tomcat은 기본적으로 전송할 데이터의 크기를 최대 2MB로 설정해 두었다. 
 그래서 파일 업로드시 파일의 총합의 크기가 2MB 를 초과한 경우에는 아래와 같은 오류가 발생한다.
 톰캣의 기본 최대 업로드 용량은 2MB이다. 
 java.lang.IllegalStateException: org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException: the request was rejected because its size (82026823) exceeds the configured maximum (2097152)

 이 크기를 변경하고자 한다면 tomcat의 server.xml 에서
 <Connector port="9090" URIEncoding="UTF-8" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443"
           maxParameterCount="1000"
           /> 을
 <Connector port="9090" URIEncoding="UTF-8" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443"
           maxParameterCount="1000"
           maxPostSize="20971520"
           />
 maxPostSize="20971520" 을 추가해주면 된다. 20971520 이 20MB 이다. 단위는 byte 단위로 적어주어야 한다.

 ◈ maxPostSize
 maxPostSize의 기본값을 넘을 경우 파라미터를 null 처리하여 서버에서 파라미터를 받을 수 없다. 
 아파치 톰캣의 기본 설정값은 2097152(2MB)로 이 이상의 사이즈를 보내게 되면 FaildRequestFilter에서 요청을 거부한다. 
 0보다 작은 값으로 설정하여 이 제한을 비활성화할 수 있다. 
 maxPostSize="-1"
 
 ◈ maxParameterCount
 maxParmaeterCount의 기본 값이 넘을 경우 기본 값에 해당하는 파라미터 수만 가져오고 나머지 파라미터는 가져오지 못한다. 
 기본 파라미터의 제한 개수는 10000개이며 이 이상의 파라미터를 보내게 되면 FaildRequestFilter에서 요청을 거부한다. 
 0보다 작은 값으로 설정하여 이 제한을 비활성화할 수 있다.
 maxParameterCount="-1"
 
 ◈ URIEncoding
 Get 요청을 처리 시 사용할 인코딩 방식 설정.
 Tomcat 7.0 은 기본적으로 ISO-8859-1 이라서, 한글 사용을 위해 UTF-8로 변경해줌.
 Tomcat 8.0 이후 부터는 기본값이 UTF-8 이라서 추가로 넣어줄 필요가 없다.
 
 ◈ connectionTimeout
 Tomcat 서버 와 클라언트 간에 Connection이 연결된 이후 실제 요청이 들어올때까지 대기 시간이다. 단위는 ms(밀리초)
 connectionTimeout="20000" 은 20초 이다.
 connectionTimeout="-1" 은 타임아웃의 제한이 없다
 
 ◈ redirectPort
 SSL통신(https://)을 하기위한 것으로서, redirectPort="8443" 이라함은 SSL통신(https://)을 하기위해 8443 포트로 설정해둔것이 있을경우라면
 port="9090" 을 사용하여 http:// 통신으로 연결을 시도하면 "8443" 포트번호로 되어진 SSL통신(https://)으로 자동적으로 변경되어 연결을 맺어준다는 것이다.  
 
 */
/*
@MultipartConfig(location = "C:\\NCS\\workspace_jsp\\MyMVC\\images_temp_upload",
                 fileSizeThreshold = 1024,  // 이 크기 값(1024 byte)을 넘지 않으면 업로드된 데이터를 메모리상에 가지고 있지만, 이값을 넘는 경우 위의 location 로 지정된 경로에 임시파일로 저장된다.  
                                            // 메모리상에 저장된 파일 데이터는 언젠가 제거된다. 하지만 크기가 큰 파일을 메모리상에 올리게 되면 서버에 부하를 줄 수 있으므로 적당한 크기를 지정해주고, 그 이상크기의 파일은 임시파일로 저장하는것이 좋다.    
                                            // 만약에 기재 하지 않으면 기본값은 0 이다. 0 을 쓰면 무조건 임시디렉토리에 저장된다.
                 maxFileSize = 20971520,    // 업로드 되어질 파일들을 합친 최대 크기. 단위는 byte 임. 20*1024*1024 즉, 20MB. 기본은 -1L 즉, 제한이 없음.   
                 maxRequestSize = 31457280  // multipart/form-data 상태인 폼태그에 요청되어지는 모든 전송데이터 및 모든 파일들을 합친 크기. 단위는 byte 임. 30*1024*1024 즉, 30MB. 기본은 -1L 즉, 제한이 없음.
                )                                               
*/

@MultipartConfig (//// 위의 location 을 기입하지 않으면 Windows 는 자동적으로 C:\Windows\Temp 디렉토리를 사용하도록 되어있다.
		maxFileSize = 20971520,
		maxRequestSize = 31457280
		)
@WebServlet(
		description = "사용자가 웹에서 *.up을 했을 경우 이 서블릿이 응답을 해주도록 한다.", 
		urlPatterns = { "*.up" },  
		initParams = { 
				@WebInitParam(name = "propertyConfig", value = "C:/NCS/workspace_jsp/MyMVC_1/src/main/webapp/WEB-INF/Command.properties", description = "*.up 에 대한 클래스의 매핑파일")
		})
public class FrontController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private Map<String, Object> cmdMap = new HashMap<>();
	
	
	
	public void init(ServletConfig config) throws ServletException {
		/*
        웹브라우저 주소창에서  *.up 을 하면 FrontController 서블릿이 응대를 해오는데 맨 처음에 자동적으로 실행되어지는 메소드가 init(ServletConfig config) 이다.
        여기서 중요한 것은 init(ServletConfig config) 메소드는 WAS(톰캣)가 구동되어진 후 딱 1번만 init(ServletConfig config) 메소드가 실행되어지고, 그 이후에는 실행이 되지 않는다. 
        그러므로 init(ServletConfig config) 메소드에는 FrontController 서블릿이 동작해야할 환경설정을 잡아주는데 사용된다.
		*/
		// *** 확인용 *** //
		// System.out.println("~~~ 확인용 => 서블릿 FrontController 의 init(ServletConfig config) 메서드가 실행됨.");
	    // ~~~ 확인용 => 서블릿 FrontController 의 init(ServletConfig config) 메서드가 실행됨.
		
		FileInputStream fis = null;
		//특정 파일에 있는 내용을 읽어오기 위한 용도로 쓰이는 객체 		
		
		String props = config.getInitParameter("propertyConfig");
		// System.out.println("확인용 => "+props);
		//확인용 => C:/NCS/workspace_jsp/MyMVC_1/src/main/webapp/WEB-INF/Command.properties
		
		try {
			fis = new FileInputStream(props);
			//fis는 C:/NCS/workspace_jsp/MyMVC_1/src/main/webapp/WEB-INF/Command.properties 파일의 내용을 읽어오기 위한 용도로 쓰이는 객체이다. 
			Properties pr = new Properties();
			// Properties 는 Collection 중 HashMap 계열중의 하나로써
	        // "key","value"으로 이루어져 있는것이다.
	        // 그런데 중요한 것은 Properties 는 key도 String 타입이고, value도 String 타입만 가능하다는 것이다.
	        // key는 중복을 허락하지 않는다. value 값을 얻어오기 위해서는 key값 만 알면 된다.
			
			pr.load(fis);
			// pr.load(fis); 은 fis 객체를 사용하여 C:/NCS/workspace_jsp/MyMVC/src/main/webapp/WEB-INF/Command.properties 파일의 내용을 읽어다가 Properties 클래스의 객체인 pr 에 로드시킨다.
			// 그러면 pr 은 읽어온 파일(Command.properties)의 내용에서 = 을 기준으로 왼쪽은 key로 보고, 오른쪽은 value 로 인식한다.

			Enumeration<Object> en = pr.keys();
	        //pr.keys(); 은 C:/NCS/workspace_jsp/MyMVC/src/main/webapp/WEB-INF/Command.properties 파일의 내용물에서 = 을 기준으로 왼쪽에 있는 모든 key 들만 가져오는 것이다.   
	       
			while(en.hasMoreElements()) {
				String key = (String) en.nextElement();
				// System.out.println("확인용 key =>"+ key);
				// System.out.println("확인용 value =>"+ pr.getProperty(key)+"\n");
				/*
				 * 확인용 key =>/test/test2.up 확인용 value =>test.controller.Test2Controller
				 * 확인용 key =>/test3.up 확인용 value =>test.controller.Test3Controller
				 * 확인용 key =>/test1.up 확인용 value =>test.controller.Test1Controller
				 */			
				String className = pr.getProperty(key);
				if(className != null) {
					className = className.trim();
					Class<?> cls = Class.forName(className);
					// <?> 은 generic 인데 어떤 클래스 타입인지는 모르지만 하여튼 클래스 타입이 들어온다는 뜻이다.
	                // String 타입으로 되어진 className 을 클래스화 시켜주는 것이다.
	                // 주의할 점은 실제로 String 으로 되어져 있는 문자열이 클래스로 존재해야만 한다는 것이다.
			
					Constructor<?> constrt = cls.getDeclaredConstructor();
					// 생성자 만들기.
					
					Object obj = constrt.newInstance();
					//생성자로 부터 실제 객체(인스턴스)를 생성해주는것이다.
					/*
					 * --확인용 Text2Controller 클래스 생성자 호출-- 
					 * --확인용 Text3Controller 클래스 생성자 호출-- 
					 * --확인용 Text1Controller 클래스 생성자 호출--
					*/
					
					cmdMap.put(key, obj);
					// cmdMap 속에 obj를 넣을때 key를 Command.properties 파일에 있는 url주소 (/test1.up)로 함.
					
					
				}// EoP if(className != null) -----
				
				
			}// EoP while(en.hasMoreElements()) -------------------
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			System.out.println(">> 문자열로 명명되어진 클래스가 존재하지 않습니다. ");
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}// EoP public void init(ServletConfig config) throws ServletException ======================================
	// 초기 환경setup 설정
	

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 웹 브라우저의 주소 입력창에서 
		// http://localhost:9090/MyMVC/member/idDuplicateCheck.up?userid=leess 와 같이 입력되었더라면 
		//String url = request.getRequestURL().toString();
		//System.out.println("확인용 url =>"+url);
		//확인용 url =>http://localhost:9090/MyMVC/member/idDuplicateCheck.up
		
		// 웹 브라우저의 주소 입력창에서 
		// http://localhost:9090/MyMVC/member/idDuplicateCheck.up?userid=leess 와 같이 입력되었더라면 
		String uri = request.getRequestURI();
		System.out.println("확인용 uri =>"+uri);
		// 확인용 uri =>/MyMVC/member/idDuplicateCheck.up
		// 확인용 uri =>/MyMVC/test1.up
		// 확인용 uri =>/MyMVC/test/test2.up
		// 확인용 uri =>/MyMVC/test3.up
		
		
		String key = uri.substring(request.getContextPath().length());
		// request.getContextPath() => /MyMVC
		// request.getContextPath().length() ==> 6자리 
		/*
			/member/idDuplicateCheck.up
			/test1.up
			/test/test2.up
			/test3.up
		*/	
		AbstractController action = (AbstractController) cmdMap.get(key);
		// 다형성 
		
		if(action == null) {// 존재하지 않는 uri값을 넣었을 경우 
			System.out.println(""+key+"는 uri 패턴에 맵핑된 클래스는 없습니다.");
		}
		else {// 존재하는 uri 값을 넣어준 경우.
			try {
				action.execute(request, response);
				
				boolean bool = action.isRedirect();
				String viewPage = action.getViewPage();
				if(!bool) {
					// viewPage 에 명기된 view단 페이지로 forward(dispatcher)를 하겠다는 말이다.
	                // forward 되어지면 웹브라우저의 URL주소 변경되지 않고 그대로 이면서 화면에 보여지는 내용은 forward 되어지는 jsp 파일이다.
	                // 또한 forward 방식은 forward 되어지는 페이지로 데이터를 전달할 수 있다는 것이다.
					if(viewPage != null) {
						RequestDispatcher dispatcher = request.getRequestDispatcher(viewPage);
						dispatcher.forward(request, response);
					}
				}
				else {
					// viewPage 에 명기된 주소로 sendRedirect(웹브라우저의 URL주소 변경됨)를 하겠다는 말이다.
	                // 즉, 단순히 페이지이동을 하겠다는 말이다. 
	                // 암기할 내용은 sendRedirect 방식은 sendRedirect 되어지는 페이지로 데이터를 전달할 수가 없다는 것이다.
					if(viewPage != null) {
						response.sendRedirect(viewPage);
					}
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
