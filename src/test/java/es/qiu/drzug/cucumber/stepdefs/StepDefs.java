package es.qiu.drzug.cucumber.stepdefs;

import es.qiu.drzug.DrzugApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = DrzugApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
