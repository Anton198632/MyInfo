import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { decrypt, decrypt_async } from "../utils/encryption"
import { setHash, setKeyPair } from "../redux/actions"


export const useHttp = () => {

    const [process, setProcess] = useState('waiting')
    const {keyPair} = useSelector(state => state)

    const dispatch = useDispatch();

    const request = useCallback((async (dataType, url, method='GET', body=null,
        headers={ 'Content-Type': 'application/json', }) =>{

            setProcess(`loading_${dataType}`);

        try{
;
            const response = await fetch(url, {method, body, headers}) 

            if (!response.ok){
                throw new Error(`Error: cound not feach ${url}, status: ${response.statusText}`);
            }


            if (response.headers.get("Content-Type") === "text/html; charset=utf-8") {
                const data = await response.arrayBuffer()
                return data;
            }

            let data = await response.json();

            if (data.encrypted_data && keyPair) {

                data = decrypt(keyPair.clientPrivateKeyPem, data.encrypted_data)
                // if (data.hash)
                //    dispatch(setHash(data.hash));

                if (data.expire_key) {
                    console.log(data.expire_key);
                    dispatch(setKeyPair(null))
                }

            }

            return data;

        } catch(e){
            console.log(e.message);

            setProcess(`error_${dataType}`);

            throw e;
        }
    }))


    return {request, process, setProcess};
}