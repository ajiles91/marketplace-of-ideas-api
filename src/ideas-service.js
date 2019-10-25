const IdeasService = {
    getAllIdeas(knex) {
        return knex.select('*').from('ideas')
    },

    getIdeaById(knex, id){
        return knex.from('ideas').select('*').where('id', id).first()
    },

    addNewIdea(knex, newIdea){
        return knex
        .insert(newIdea)
        .into('ideas')
        .returning('*')
        .then(rows => rows[0])
    },

    updateClaimedVariable(knex, id, newClaimedVariable){
        return knex('ideas')
        .where({ id })
        .update(newClaimedVariable)
    },

}
module.exports = IdeasService