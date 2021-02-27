describe('Blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    const testingUser1 = {
      name : 'Long Mai',
      username: 'longm',
      password: 'hntnlctbcbvstb'
    }
    cy.request('POST', 'http://localhost:3001/api/users', testingUser1)
    const testingUser2 = {
      name : 'Long2',
      username: 'longm2',
      password: 'hntnlctbcbvstb2'
    }
    cy.request('POST', 'http://localhost:3001/api/users', testingUser2)

    cy.login({ username: 'longm2', password: 'hntnlctbcbvstb2' })
    const blog1 = { title:'title 1', author: 'Long2', url:'vnexpress.net', likes:100 }
    const blog2 = { title:'title 2', author: 'Long2', url:'vnexpress.net', likes: 50 }
    const blog3 = { title:'title 3', author: 'Long2', url:'vnexpress.net', likes: 73 }
    cy.createBlog(blog1)
    cy.createBlog(blog2)
    cy.createBlog(blog3)
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
    cy.get('#username').type('sdfsdf')
    cy.get('#password').type('fdsfsdfsdf')
  })

  describe('Login', function() {
    it('succeed with correct credentials', function() {
      cy.get('#username').type('longm')
      cy.get('#password').type('hntnlctbcbvstb')
      cy.get('#login').click()
      cy.contains('Long Mai logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('sdfsdf')
      cy.get('#password').type('fdsfsdfsdf')
      cy.get('#login').click()
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'longm', password:'hntnlctbcbvstb' })
    })

    it('A blog can be created', function() {
      cy.get('#buttonLabel').click()
      cy.get('#title').type('a new blog by longm')
      cy.get('#author').type('Long')
      cy.get('#url').type('vnexpress.net')
      cy.get('#likes').type(123)
      cy.get('#create').click()
      cy.contains('a new blog by longm')
    })
    it('A blog can be liked by an user', function() {
      cy.contains('title 1').contains('view').click()
      cy.contains('title 1').contains('like').click()
      cy.contains('title 1').contains(101)
    })

    it('A blog can be deleted by its user', function() {
      const blogToBeDeleted = {
        title:'a wonderful post that will be deleted',
        author: 'Long Mai',
        url:'vnexpress.net',
        likes: 10000 }
      cy.createBlog(blogToBeDeleted)
      cy.contains('a wonderful post').contains('view').click()
      cy.contains('a wonderful post').contains('Remove').click()
      cy.get('html').should('not.contain', 'a wonderful post')
    })

    it.only('the blogs are ordered according to likes', function() {
      cy.get('.view').click({ multiple:true })
      cy.get('.numLikes').then((likes) => {
        const numLikes = [...likes.map((index, element) => element.textContent)]
        expect(numLikes[0]).to.equal('100')
        expect(numLikes[1]).to.equal('73')
        expect(numLikes[2]).to.equal('50')
      })
    })
  })

})