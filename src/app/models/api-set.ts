export interface IApiSet {
  code: string;
  name: string;
  gatherer_code: any;
  old_code: any;
  magic_cards_info_code: any;
  release_date: any;
  border: any;
  type: any;
  block: any;
  online_only: any;
  booster: any;
  mkm_id: any;
  mkm_name: any;
}

export class ApiSet {
  public code: string;
  public name: string;
  public gatherer_code: any;
  public old_code: any;
  public magic_cards_info_code: any;
  public release_date: any;
  public border: any;
  public type: any;
  public block: any;
  public online_only: any;
  public booster: any;
  public mkm_id: any;
  public mkm_name: any;

  constructor() {
    this.code = '';
    this.name = '';
    this.gatherer_code = '';
    this.old_code = '';
    this.magic_cards_info_code = '';
    this.release_date = '';
    this.border = '';
    this.type = '';
    this.block = '';
    this.online_only = '';
    this.booster = '';
    this.mkm_id = '';
    this.mkm_name = '';
  }
}