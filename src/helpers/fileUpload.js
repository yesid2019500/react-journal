// recibimos el archivo que vamos a subir
export const fileUpload = async (file) => {
    const claudUrl = 'https://api.cloudinary.com/v1_1/dpkbjmvpg/upload';

    // aqui va el formDate para enviaserlo a claudinay

    const formData = new FormData()
    // datos de carga
    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    try {

        const resp = await fetch(claudUrl, {
            method: 'POST',
            body: formData
        })

        if (resp.ok) {
            const claudResp = await resp.json();
        // secure_url viene en la imagen
            return claudResp.secure_url
        }else{
            throw await  resp.json();
        }
        
    } catch (error) {
        throw error
    }
}