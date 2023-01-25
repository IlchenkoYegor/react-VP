export const hasAuthorities = (user, ...authorities) =>{
    if(user.authorities.includes("ADMIN")){
        return true;
    }
    const listOfAuthorities = [...authorities];
    return (user.authorities.map(authority => listOfAuthorities.indexOf(authority)>=0)).indexOf(true)>=0;
}