describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const newUser = {
      username: "alex123",
      name: "Alex Ivanovich",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users", newUser);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("login to application");
    cy.get("#login-btn");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("alex123");
      cy.get("#password").type("password");
      cy.get("#login-btn").click();
      cy.contains("Welcome to blog app");
      cy.contains("Alex Ivanovich logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("alex123");
      cy.get("#password").type("wrong");
      cy.get("#login-btn").click();
      cy.get(".redClassMessage").should(
        "contain",
        "wrong username or password"
      );
      cy.get(".redClassMessage").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get(".redClassMessage").should("have.css", "border-style", "solid");
    });
  });
});
