package no.nav.sbl.ledeteksteditor;

import javafx.scene.control.TextInputControl;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SwaggerServlet extends HttpServlet {
    private String applicationFile;
    private static final Pattern FILEPATTERN = Pattern.compile("/ledeteksteditor/internal/(.*?)$");

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        RequestDispatcher index;
        Matcher matcher = FILEPATTERN.matcher(request.getRequestURI());
        if(matcher.find()){
            System.out.println(matcher.group(1));
            index = getServletContext().getRequestDispatcher("/" + matcher.group(1));
        }
        else{
             index = getServletContext().getRequestDispatcher("/swagger/index.html");
        }
        index.forward(request, response);
    }
}
