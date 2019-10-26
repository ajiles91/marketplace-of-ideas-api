const IdeasService = {
    getAllIdeas(knex) {
        return knex.select('*').from('ideas')
    },

    getIdeaById(knex, id){
        return knex.from('ideas').select('*').where('id', id).first()
    },

    addNewIdea(knex, newIdea){
        console.log(newIdea)
        return knex
    
        .insert(newIdea)
        .into('ideas')
        .returning('*')
        .then(
            console.log('successful'),
            rows => rows[0]
        )
    },

    updateClaimedVariable(knex, id, newClaimedVariable){
        console.log(id)
        return knex('ideas')
        .where('id', id)
        .update(newClaimedVariable)
    
    },
    
}
module.exports = IdeasService