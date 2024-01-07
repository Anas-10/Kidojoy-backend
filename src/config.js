var config = {}

config.database = {
    kidjoy : {
        host     :  'localhost',
        user     :  'anas',
        password :  'Anas@1234',
        database :  'kidjoy'
    },
   
}

config.auth = [
    {
        TOKEN_KEY: 'manager.kido.joy',
        role: 'MANAGER',
        username: 'manager.kido',
        //RPUWDX6B
        password: '$2a$10$tZ2F76dXZAKvnu0H3SKuNek1fWxDIPYF35ym75GUQqnC04BpwCVmm'
    },
    
]

config.PORT = '3002'


module.exports = config