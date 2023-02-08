
const express = require('express')
const jwt = require('jsonwebtoken')
const sqlite3 = require('sqlite3')

const app = express()
const db = new sqlite3.Database('./upsave-database.db')

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// ------------------------------Enable CORS

app.use(function(request, response, next){
	
	response.setHeader("Access-Control-Allow-Origin", "*") 
	response.setHeader("Access-Control-Allow-Methods", "*")
	response.setHeader("Access-Control-Allow-Headers", "*")
	response.setHeader("Access-Control-Expose-Headers", "*")
	
	next()
	
})

// ---------------------------------DATABASE: Creating tables

const createTable = `CREATE TABLE IF NOT EXISTS accounts
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    username TEXT, 
    password TEXT
    )`
const createAccountsTable = `CREATE TABLE IF NOT EXISTS accounts
(
id INTEGER PRIMARY KEY AUTOINCREMENT, 
username TEXT, 
password TEXT,
CONSTRAINT uniqueUsername UNIQUE(username)
)`
const createProjectsTable = `CREATE TABLE IF NOT EXISTS projects
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT, 
    description TEXT,
    clientName TEXT,
    expectedDeadline TEXT,
    accountId INTEGER,
    FOREIGN KEY (accountId) REFERENCES accounts(id),
    cardColor TEXT
    )` 
db.run(createTable, function(error) {
        if (error) {
        }
        else {
            const id = this.lastID
        }
    })
db.run(createAccountsTable, function(error) {
    if (error) {
    }
    else {
        const id = this.lastID
    }
})
db.run(createProjectsTable, function(error) {
        if (error) {
        }
        else {
            const id = this.lastID
        }
    })

app.get("/accounts/:id", function(request, response){

    const id = request.params.id
    const fetchOwnAccount = "SELECT * FROM accounts WHERE id = ?"
    const values = [id]
    const accessToken = request.get("Authorization") 

    db.get(fetchOwnAccount, values, function(error, account){
        if(error){
            
            response.status(500).end()
        }else if(!account){
            response.status(404).end()
        }else{
            response.status(200).json(account)
        }
    })
})

//-----------------------Adding login/ Creating Tokens

app.post('/tokens', function(req, res){
    
    const username = req.body.username
    const password = req.body.password

    const query = "SELECT * FROM accounts WHERE username = ? AND password = ?"
    const values = [username, password]

    db.get(query, values, function(error, account){
        if(error){
            console.log(error)

            res.status(500).end()
        }else if(account){
            //successful login!
            const accessToken = jwt.sign({
                accountId: account.id,
            }, "oiuiuytrtefxfx")

            const idToken = jwt.sign({ 
                accountId: account.id,
                username: account.username,
            }, "lkjlkj")

            res.status(200).json({
                accessToken,
                idToken
            })
           
        }else{
            res.status(400).json(["wrongCredentials"])
        }
    })
})

// --------------------------------Account Actions

app.post("/accounts", function(request, response){
    const username = request.body.username
    const password = request.body.password

    const errorCodes = []

    if(username == ""){
        errorCodes.push("usernameIsEmpty")
    }
    if(password == ""){
        errorCodes.push("passwordIsEmpty")
    }
    if(0 < errorCodes.length){
        response.status(400).json(errorCodes)
    }
    else{
        const query = "INSERT INTO accounts (username, password) VALUES (?,?)"
        const values = [username, password]

        db.run(query, values, function(error){
            if(error){
                if (error.message == "SQLITE_CONSTRAINT: UNIQUE constraint failed: accounts.username") {
                    errorCodes.push("usernameTaken")
                    response.status(409).json(errorCodes)
                }
                else {
                response.status(500).end()
                }
            } else{
                response.status(201).end()
            }
        })
    }
    
})  

app.put("/accounts/:id", function(request, response){
    const id = request.params.id 

    const errorCodes = []

    const username = request.body.username
    const password = request.body.password

    if(username == ""){
        errorCodes.push("usernameIsEmpty")
    }else if(password == ""){
        errorCodes.push("passwordIsEmpty")
    }
    if(0 < errorCodes.length){
        response.status(400).json(errorCodes)
    }
    else{
        const updateAccount = `UPDATE accounts SET username = ?, password = ? WHERE id = ?` 
        
        const values = [username, password, id]
        
        db.run(updateAccount, values, function(error){
            if(error){
                response.status(500).end()
            }else{
                response.status(200).end()
                
            }
        })
    } 
})
app.delete("/accounts/:id", function(request, response){
    const id = request.params.id

    const deleteAccount = `DELETE FROM accounts WHERE id = ?` 
    const values = [id]
    db.run(deleteAccount, values, function(error){
        if(error){
            response.status(500).end()
        }else{
            response.status(204).end()
        }
    })
})

//-------------------------------------Project Actions


app.get("/projects", function(request, response){

  //Getting the accesstoken from the authorization header and verifying it.
  const accessToken = request.get("Authorization");
  const payload = jwt.verify(accessToken, "oiuiuytrtefxfx");

  //Getting accountId and using it in the query.
  const accountId = request.query.accountId;
  const query = "SELECT * FROM projects WHERE accountId =" + accountId;

  //Check if the accountId is the same as the accountId retrieved from the access token.
  if (accountId != payload.accountId) {
    response.status(500).end();
  } else {
    db.all(query, function (errors, projects) {
        if (errors) {
            response.status(500).end();
          
        } else {
            response.status(200).json(projects);
        }
      });
  }


})

app.post("/projects", function(request, response){

    const title = request.body.title
    const description = request.body.description
    const clientName = request.body.clientName
    const expectedDeadline = request.body.expectedDeadline
    const accountId = request.body.accountId
    // const cardColor = request.body.cardColor

    const accessToken = request.get("Authorization")
    const payload = jwt.verify(accessToken, "oiuiuytrtefxfx") 

    if(accountId != payload.accountId){
        response.status(401).end()
        return
    }

    const errorCodes = []

    if(title == ""){
        errorCodes.push("tilteIsEmpty")
    }else if(description == ""){
        errorCodes.push("descriptionIsEmpty")
    }else if(clientName == ""){
        errorCodes.push("clientNameIsEmpty")
    }else if(expectedDeadline == ""){
        errorCodes.push("expectedDeadlineIsEmpty")
    }
    if(0 < errorCodes.length){
        response.status(400).json(errorCodes)
    }
    else{
        const query = "INSERT INTO projects (title, description, clientName, expectedDeadline, accountId) VALUES (?,?,?,?,?)"
        const values = [title, description, clientName, expectedDeadline, accountId]
        
        db.run(query, values, function(error){
            if(error){
                response.status(500).end()
            } else{
                response.status(201).end()
                
            }
        })
    }
    
}) 

app.put("/projects/:id", function(request, response){
    const id = request.params.id 

    const errorCodes = []

    const title = request.body.title
    const description = request.body.description
    const clientName = request.body.clientName
    const expectedDeadline = request.body.expectedDeadline

    if(title == ""){
        errorCodes.push("tilteIsEmpty")
    }else if(description == ""){
        errorCodes.push("descriptionIsEmpty")
    }else if(clientName == ""){
        errorCodes.push("clientNameIsEmpty")
    }else if(expectedDeadline == ""){
        errorCodes.push("expectedDeadlineIsEmpty")
    }
    if(0 < errorCodes.length){
        response.status(400).json(errorCodes)
        errorCodes = []
    }
    else{
        const updateProject = `UPDATE projects SET title = ?, description = ?, clientName = ?, expectedDeadline = ? WHERE id = ?` 
        
        const values = [title, description, clientName, expectedDeadline, id]

        db.run(updateProject, values, function(error){
            if(error){
                response.status(500).end()
            }else{
                response.status(200).end()
                
            }
        })
    }
})

app.get("/projects/:id", function(request, response){

    const id = request.params.id
    const fetchOneProject = "SELECT * FROM projects WHERE id = ?"
    const values = [id]

    db.get(fetchOneProject, values, function(error, project){
        if(error){
            response.status(500).end()
        }else if(project){
            response.status(200).json(project)
        }else{
            response.status(404).end()
        }
    })
})

app.delete("/projects/:id", function(request, response){
    const id = request.params.id

    const deleteProject = `DELETE FROM projects WHERE id = ?` 
    const values = [id]
    db.run(deleteProject, values, function(error){
        if(error){
            response.status(500).end()
        }else{
            response.status(204).end()
        }
    })
})

app.get("/", function(request, response){
    response.send("Hello, World!")
})

app.listen(3000)





