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
    describe("When logged in", function () {
      beforeEach(function () {
        cy.login({ username: "alex123", password: "password" });
      });
      it("add new blog", function () {
        cy.contains("add blog").click();
        cy.get("#author").type("Jasprit Sangha");
        cy.get("#title").type("Indian culture in the west");
        cy.get("#url").type("http://www.exchangeculture.com");
        cy.contains("Create").click();
        cy.get(".a_blog").should("contain", "Indian culture in the west");
      });
      it("users can like a blog", function () {
        cy.addBlog({
          author: "Jasprit Sangha",
          url: "http://www.exchangeculture.com",
          title: "Indian culture in the west",
          likes: 99,
        });
        cy.contains("view").click();
        cy.get(".blog-info").should("contain", 99);
        cy.contains("like").click();
        cy.get(".blog-info").should("contain", 100);
      });
    });
  });
});
