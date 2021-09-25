export class Report {
    id?:any;
    horodateur?:any;
    stage_ou_projet?:boolean;
    date_debut_stage?:Date;
    date_fin_stage?:Date;
    intitule_stage?:String;
    societe_stage?:String;
    secteur_societe?:String;
    ville_societe?:String;
    pays_societe?:String;
    details_add_societe?:String;
    parrain?:String;
    email_parrain?:any;
    telephone_parrain?:any;
    fichier_rapport?:File;
    rapport_confidentiel?:boolean;
    fk_etudiant?:any;
    type_rapport?:String;
    resume_rapport?:String;
    jurys?:Number[];
    valid_admin?:boolean;
    fk_encadrant_univ?:any;
    valid_encadrant?:boolean;
    }
