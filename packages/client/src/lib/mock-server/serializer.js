import { RestSerializer } from "miragejs";

const ApplicationSerializer = RestSerializer.extend({
    /** Embeds relationships inside the model, and not alongside it in the response */
    embed: true,

    /** If enabled, it will wrap the response object with the model name like this:
     *  {
     *      modelName: {
     *          ActualResponse...
     *      }
     *  }
     **/
    root: false,
});

export const serializers = {
    application: ApplicationSerializer,
    
    project: ApplicationSerializer.extend({
        include: ["groups"],
    }),

    group: ApplicationSerializer.extend({
        include: ["tasks"],
    }),
};
