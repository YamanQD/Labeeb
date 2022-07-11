import { belongsTo, hasMany, Model } from "miragejs";

export const models = {
    project: Model.extend({
        groups: hasMany(),
    }),

    group: Model.extend({
        project: belongsTo(),
        tasks: hasMany(),
    }),

    task: Model.extend({
        group: belongsTo(),
    }),
};
