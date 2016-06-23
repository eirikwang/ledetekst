package no.nav.sbl.ledeteksteditor;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AppServlet extends HttpServlet {
    private String applicationFile;
    public static final String FILE_REQUEST_PATTERN = "^(.+\\..{1,4})$";
    public static final String SWAGGER_REQUEST_PATTERN = "^.*/internal/swagger.*$";

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

        if (request.getRequestURI().matches(SWAGGER_REQUEST_PATTERN)) {
            dispatcher.forward(request, response);
        } else if (!request.getRequestURI().matches(FILE_REQUEST_PATTERN)) {
            RequestDispatcher index = getServletContext().getRequestDispatcher(applicationFile);
            index.forward(request, response);
        } else {
            dispatcher.forward(request, response);
        }
    }
}
