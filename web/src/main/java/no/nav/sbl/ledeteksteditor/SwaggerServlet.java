package no.nav.sbl.ledeteksteditor;

import io.swagger.jaxrs.config.BeanConfig;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

public class SwaggerServlet extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);

        BeanConfig beanConfig = new BeanConfig();
        beanConfig.setVersion("1.0.0");
        beanConfig.setSchemes(new String[]{"http"});
        beanConfig.setHost("http://a34duvw25882.devillo.no:8182");
        beanConfig.setBasePath("/api-beskrivelse");
        beanConfig.setResourcePackage("no.nav.sbl.ledeteksteditor.rest");
        beanConfig.setScan(true);

    }

}
