import PostModel from '../models/posts'

const userRoute = (app) => {
    app.route('/posts/:id?')
    .get(async(req,res) => {
        const { id } = req.params
        const query = {};

        if (id) {
            query._id = id
        }

        try {

            const posts = await PostModel.find(query)
            res.send({ posts })
            
        } catch (error) {
            res.status(400).json({ error: true,message: " Post nao encontrado." })
        }
    })
    .post(async(req,res) => {
        try {
            const post = new PostModel(req.body)
            await post.save()

            res.status(201).json(post)
        } catch (error) {
            res.status(400).json({error: true, message: error.getMessage()})
        }
    })
    .put(async(req,res)=>{
        const {id} = req.params
        if(!id){
            return res.status(400).json({error: true,message: "Id nao informado."})
        }
        try {
            const updatePost = await PostModel.findOneAndUpdate({_id: id},req.body,{
                new: true,
            })
            if(updatePost){
                return res.status(200).json({erro: false,message: "Post Atualizado com sucesso."})
            }
            res.status(400).json({erro: true, message: "Nao foi possivel atualizar post"})
        } catch (error) {
            res.status(400).json({erro: true, message: error.getMessage()})
            
        }
    })
    .delete(async(req,res)=>{
        const {id} = req.params
        if(!id){
            return res.status(400).json({error: true, message: "Id nao informado"})
        }
        try {
            const deletedUser = await PostModel.deleteOne({_id: id})

            if (deletedUser.deletedCount) {
                return res.status(200).json({erro: false, message: "Post deletado com sucesso"})
            }
            res.status(400).json({erro: true, message: "Nao foi possivel deletar post"})
        } catch (error) {
            res.status(400).json({erro: true, message: error.getMessage()})
        }
    })
}

module.exports = userRoute;