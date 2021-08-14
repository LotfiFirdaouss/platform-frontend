export class Report {
    id?:any;
    stage_ou_projet?:boolean;
    date_debut_stage?:Date;
    date_fin_stage?:Date;
    intitule_stage?:String;
    societe_stage?:String;
    secteur_societe?:String;
    ville_societe?:String;
    pays_societe?:String;
    details_add_societe?:String;
    encadrant?:String;
    email_encadrant?:any;
    telephone_encadrant?:any;
    fichier_rapport?:File;
    rapport_confidentiel?:boolean;
    fk_etudiant?:number;
    }
