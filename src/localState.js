export function getLocalState() {
    try{
        const serializedState = localStorage.getItem('state');
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch(e){
        return undefined;
    }
}

export function setLocalState(state){
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch(e){}
}