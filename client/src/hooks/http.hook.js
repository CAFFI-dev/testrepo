import {useState, useCallback} from 'react'

export const useHttp = () => {
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    const request = useCallback(async(url, method = 'GET', body = null, headers = {}) => {
        //начата загрузка на front-end
        setLoading(true);
        try{
            if(body){
                body = JSON.stringify(body);
                console.log('dev')
                //указываем, что передаем Json
                headers['Content-Type'] = 'application/json'
            }

            //делаем запрос на сервер, и получаем объект
            const responce = await fetch(url, {method, body, headers})
            const data = await responce.json();

            if(!responce.ok){
                throw new Error(data.message || 'Что-то пошло не так....');
            }
            //загрузка закончена
            setLoading(false);
            return data;
        } catch (e){
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, [])

    //функция, которая чистит ошибки
    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError}
}