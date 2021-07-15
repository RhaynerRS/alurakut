const { SiteClient } = require('datocms-client')


export default async function recebedorDeRequests(request,response){
    if (request.method==='POST'){
        const TOKEN ='ecb80bbec9a2e648d135577b0562b3'

        const client = new SiteClient(TOKEN)

        const record=await client.items.create({ 
            itemType: '107224',
            ...request.body,
            /*title: dadosDoForm.get('title'),
            imageurl: dadosDoForm.get('image'),
            creatorslug:githubUser*/
        })

        response.json({
            dados:"algum dado qualquer",
            record:record
        })
    }
}
