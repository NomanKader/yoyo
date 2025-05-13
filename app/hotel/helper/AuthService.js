import LoginService from "../services/LoginService";

const _AuthHelper=(username,password)=>{
    let postBody={
        "username":username,
        "password":password
    }    
    const data=LoginService(postBody);
    console.log("Data From Auth Service",data);
    
}
export default _AuthHelper;