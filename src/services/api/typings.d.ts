declare namespace API {
  type Login = {
    username: string;
    password: string;
  };

  type AddUser = {
    username: string;
    password: string;
    email: string;
    mobile: string;
  };

  type CategoriesList = {
    type: any;
    pagenum: any;
    pagesize: any;
  };
}
