package no.nav.sbl.ledeteksteditor;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AppServlet extends HttpServlet {
    private String applicationFile;
    public static final String FILE_REQUEST_PATTERN = "^(.+\\..{1,4})$";
    public static final String SWAGGER_REQUEST_PATTERN = "^.*/internal/swagger(.*)$";
    public static final String SWAGGER_INDEX_REQUEST_PATTERN = "^.*/internal/swagger/?$";
    public static final String SWAGGER_PATH = "/webjars/swagger-ui/2.1.8-M1";
    public static final String SWAGGER_BASE_URI_PARAMATER = "?input_baseurl=/ledeteksteditor/internal/api/swagger.json";
    public static final String SWAGGER_INDEX_PATH =  "/ledeteksteditor/internal/swagger/index.html" + SWAGGER_BASE_URI_PARAMATER;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        applicationFile = config.getInitParameter("applicationFile");
        if (!applicationFile.startsWith("/")) {
            applicationFile = "/" + applicationFile;
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestDispatcher dispatcher = getServletContext().getNamedDispatcher("default");
        if (request.getRequestURI().matches(SWAGGER_INDEX_REQUEST_PATTERN)){
            // Redirects /internal/swagger/ til /internal/swagger/index.html?input_baseurl=... for å få parameteret som en del av urlen
            response.sendRedirect(SWAGGER_INDEX_PATH);
        }else if(request.getRequestURI().matches(SWAGGER_REQUEST_PATTERN)) {
            Matcher matcher = Pattern.compile(SWAGGER_REQUEST_PATTERN).matcher(request.getRequestURI());
            matcher.find();
            String etterspurtFil = matcher.group(1);
            RequestDispatcher index = getServletContext().getRequestDispatcher(SWAGGER_PATH + etterspurtFil);
            index.forward(request, response);
        } else if (!request.getRequestURI().matches(FILE_REQUEST_PATTERN)) {
            RequestDispatcher index = getServletContext().getRequestDispatcher(applicationFile);
            index.forward(request, response);
        } else {
            dispatcher.forward(request, response);
        }
    }
}
