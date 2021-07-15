const { SiteClient } = require('datocms-client')


export default async function recebedorDeRequests(request,response){
    if (request.method==='POST'){
        const TOKEN ='98ed52190da0354328bc8ed17cc8a8'

        const client = new SiteClient(TOKEN)

        const record=await client.items.create({ 
            itemType: '967610',
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