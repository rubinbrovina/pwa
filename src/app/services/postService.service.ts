import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertifyService } from './Alertify.service';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw'
import { environment } from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt'
import { LowerCasePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})

export class PostService {

  jwtHelper= new JwtHelperService()

  constructor(private http: HttpClient, private alertify: AlertifyService) {
    this.getUserLoggedInUuid();
  }

  getUserLoggedInUuid(){
    let token = localStorage.getItem("token");
    let decodedToken = this.jwtHelper.decodeToken(token);
    this.userLoggedInUuid = decodedToken.uuid;
    this.currentUserRoom = localStorage.getItem("currentUser");
  }

  userLoggedInUuid;
  userGettingRegisteredUuid;
  currentUserRoom;

  roomQeveria;
  roomPS;
  roomFresh;
  userGroup;

  registerUrl = environment.baseUrl + "register"
  imageUrl = environment.baseUrl + "upload";
  baseUrl = environment.baseUrl + "middle";
  changePassUrl = environment.baseUrl + "changepass";
  lowercase = new LowerCasePipe;
  transformText(value) {
    return value.replace(/"/g, '\\"');
  }

  postComment(forma, imageUuid) {
    let postimPerRoominPS;
    let postimPerRoominFRESH;
    let postimPerRoominQEVERIA;
    var tempID = String(Math.floor(Date.now() / 1000));

    if (forma["PS"] == true) {
      postimPerRoominPS = `cc: addPostRoom(roomID:"f23af4e0-c719-11e8-85a9-0242ac110002", postTempID:"${tempID}")`
    } else { postimPerRoominPS = '' }

    if (forma["FRESH"] == true) {
      postimPerRoominFRESH = `dd: addPostRoom(roomID:"ad702f70-c7c7-11e8-85a9-0242ac110002", postTempID:"${tempID}")`
    } else { postimPerRoominFRESH = '' }

    if (forma["QEVERI"] == true) {
      postimPerRoominQEVERIA = `ee: addPostRoom(roomID:"b1705af0-c7c7-11e8-85a9-0242ac110002", postTempID:"${tempID}")`
    } else { postimPerRoominQEVERIA = '' }

    let json = {
      query: `
    mutation{
      aa: createPost(title:"${this.transformText(forma["title"])}", body:"${this.transformText(forma["content"])}", shareableUrl:"${forma["link"]}", featuredImageUUID:"${imageUuid}", postTempID:"${tempID}")
      bb: addPostType(postTempID:"${tempID}", typeID:"4d1e5e90-c6e0-11e8-85a9-0242ac110002")
      ${postimPerRoominPS}
      ${postimPerRoominFRESH}
      ${postimPerRoominQEVERIA}
    }
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  postShareable(forma, imageUuid) {
    let postimPerRoominPS;
    let postimPerRoominFRESH;
    let postimPerRoominQEVERIA;
    var tempID = String(Math.floor(Date.now() / 1000));
    var date = Date.now()

    if (forma["PS"] == true) {
      postimPerRoominPS = `cc: addPostRoom(roomID:"f23af4e0-c719-11e8-85a9-0242ac110002", postTempID:"${tempID}")`
    } else { postimPerRoominPS = '' }

    if (forma["FRESH"] == true) {
      postimPerRoominFRESH = `dd: addPostRoom(roomID:"ad702f70-c7c7-11e8-85a9-0242ac110002", postTempID:"${tempID}")`
    } else { postimPerRoominFRESH = '' }

    if (forma["QEVERI"] == true) {
      postimPerRoominQEVERIA = `ee: addPostRoom(roomID:"b1705af0-c7c7-11e8-85a9-0242ac110002", postTempID:"${tempID}")`
    } else { postimPerRoominQEVERIA = '' }

    let json = {
      query: `
    mutation{
      aa: createPost(title:"${this.transformText(forma["title"])}",datetime:"${date}" body:"${this.transformText(forma["content"])}", shareableUrl:"${forma["link"]}", twiterLoveUrl:"${forma["twiterLoveUrl"]}", instaLoveUrl:"${forma["instaLoveUrl"]}", fbLikeUrl:"${forma["fbLikeUrl"]}",featuredImageUUID:"${imageUuid}", postTempID:"${tempID}")
      bb: addPostType(postTempID:"${tempID}", typeID:"49e8d610-c6e0-11e8-85a9-0242ac110002")
      ${postimPerRoominPS}
      ${postimPerRoominFRESH}
      ${postimPerRoominQEVERIA}
    }
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  getAllActivity(firstDate, secondDate){
    let url = `https://back.majtas.net/sharebles?firstDate=${firstDate}&secondDate=${secondDate}`
    
   return this.http.get(url).map((res: Array<any>)=> res)
  }
  getGovActivity(firstDate, secondDate){
    let url = `https://back.majtas.net/sharebles/ministries?firstDate=${firstDate}&secondDate=${secondDate}`
    return this.http.get(url).map((res: Array<any>)=> res)
  }
  getPSActivity(firstDate, secondDate){
    let url = `https://back.majtas.net/sharebles/ps?firstDate=${firstDate}&secondDate=${secondDate}`
    return this.http.get(url).map((res: Array<any>)=> res)
  }
  getFreshActivity(firstDate, secondDate){
    let url = `https://back.majtas.net/sharebles/fresh?firstDate=${firstDate}&secondDate=${secondDate}`
    return this.http.get(url).map((res: Array<any>)=> res)
  }

  getAllPosts(): Observable<any> {
    let json = {
      query: `
     {     
        Post {
          datetime
          uuid
          title
          body
          shareableUrl
          featuredImageUUID
          postType{
          type
          }
        }    
     }
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  getAllPostsComment(): Observable<any> {
    this.getUserLoggedInUuid();
    let json = {
      query: `
      {
        Room(filter:{uuid:"${this.currentUserRoom}"}){
          posts(filter:{postType:{uuid:"4d1e5e90-c6e0-11e8-85a9-0242ac110002"}}){
            uuid
            title
            datetime
            body
            shareableUrl
            featuredImageUUID
            twiterLoveUrl
            instaLoveUrl
            fbLikeUrl
          }
        }
      }
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  getAllPostsShareable(): Observable<any> {
    this.getUserLoggedInUuid();
    let json = {
      query: `
      {
        Room(filter:{uuid:"${this.currentUserRoom}"}){
          posts(filter:{postType:{uuid:"49e8d610-c6e0-11e8-85a9-0242ac110002"}}){
            uuid
            datetime
            title
            body
            shareableUrl
            featuredImageUUID
            twiterLoveUrl
            instaLoveUrl
            fbLikeUrl
          }
        }
      }
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  getSpecificPost(uuid): Observable<any> {
    let json = {
      query: `
    {
      Post(filter:{uuid:"${uuid}"}){
        uuid
        title
        body
        shareableUrl
        featuredImageUUID
      }
    }
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  saveSpecificPost(specificPost) {
    let json = {
      query: `
    mutation{
    updatePost(uuid:"${specificPost.uuid}", title:"${this.transformText(specificPost.title)}", body:"${this.transformText(specificPost.body)}", shareableUrl:"${specificPost.shareableUrl}")
    }
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  deleteSpecificPost(uuid) {
    let json = {
      query: `
    mutation{
      deletePost(uuid:"${uuid}")
    }
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  addCommentToPost(shtoDheKomentoForm, uuid) {
    var tempID = String(Math.floor(Date.now() / 1000));
    var datetime = Date.now()
    let json = {
      query: `
    mutation{
      aa: createComment(comment:"${shtoDheKomentoForm["koment"]}", datetime:"${datetime}", nickname:"${shtoDheKomentoForm["nickname"]}", blogUrl:"${shtoDheKomentoForm["url"]}" ,commentTempID:"${tempID}")
      bb: addPostComment(postUUID:"${uuid}", commentTempID:"${tempID}")
      cc: addUserComment(userUUID:"${this.userLoggedInUuid}", commentTempID:"${tempID}")
    }    
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res)
  }

  getAllCommentsToApprove() {
    var tempID = String(Math.floor(Date.now() / 1000));

    let json = {
      query: `
    {
      Comment{
        uuid
        nickname
        comment
        status
        blogUrl
        user{
          username
        }
      }
    }   
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res)
  }

  approveComment(uuid, nickname, comment) {
    let json = {
      query: `
    mutation{
      updateComment(uuid:"${uuid}", status: true, nickname:"${nickname}", comment:"${comment}")
    }   
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  dontApproveComment(uuid, nickname, comment) {
    let json = {
      query: `
    mutation{
      updateComment(uuid:"${uuid}", status: false, nickname:"${nickname}", comment:"${comment}")
    }   
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  getAllUsers() {
    let json = {
      query: `
      {
        User(filter:{isDeleted:false}){
          uuid
          username
          name
          email
          rooms{
            name
          }
          comments{
            _id
          }
          facebookSharebles{
            _id
          }
          twitterSharebles{
            _id
          }
          twitLove{
            _id
          }
          facebookLike{
            _id
          }
          whatsappSharebles{
            _id
          }
          instaLove{
            _id
          }
  
        }
      }
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  getUser(uuid) {
    let json = {
      query: `{
    User(filter:{uuid:"${uuid}"}){
      comments {
        uuid
        blogUrl
       datetime
       post {
         title
         uuid
       }
      }
      username
      activity {
        datetime
      }
      twitterSharebles {
        datetime
        post {
          uuid
          title
         }
      }
      facebookLike {
        datetime
        post {
          uuid
           title
         }
      }
      facebookSharebles {
        datetime
        post {
          uuid
          title
         }
          facebookProfile {
          facebookID
          name
          image
        }
      }
      twitLove {
        datetime
        post {
          uuid
          title
         }
      }
      instaLove {
        datetime
        post {
          uuid
          title
         }
      }
      whatsappSharebles {
        datetime
        post {
          uuid
          title
         }
      }
    }
    }`}
    return this.http.post(this.baseUrl, json).map((response: Response) => response)
  }

  getProfiliImUser(){
    this.getUserLoggedInUuid();
    let json = {
      query: `{User(filter:{uuid:"${this.userLoggedInUuid}"}){
        facebookID
        twitterID
        username
        name
        email
        datetimeCreated
        points
        sex
        tel
        qarku
        bashkia
        birthdate
        isDeleted
      }
    }`
    }
    return this.http.post(this.baseUrl, json).map((res:Response) => res)
  }

  saveProfiliImUser(user){
    this.getUserLoggedInUuid();
    let json = {
      query: `
      mutation{
        updateUser(uuid:"${this.userLoggedInUuid}", username:"${user["username"]}", name:"${user["name"]}", email:"${user["email"]}", tel:"${user["tel"]}", qarku:"${user["qarku"]}", bashkia:"${user["bashkia"]}", birthdate:"${user["birthdate"]}")
      }
      `
    }
    return this.http.post(this.baseUrl, json).map((res:Response) => res)
  }

  registerUser(registerUserForm) {

    this.userGroup = registerUserForm["userGroup"]

    let obj = {
      "username": this.lowercase.transform(registerUserForm["username"]),
      "password": registerUserForm["password"]
    }

    this.http.post(this.registerUrl, obj).subscribe(
      x => {
        this.userGettingRegisteredUuid = x["userUUID"]
        if (registerUserForm["QEVERI"] == true) {
          this.roomQeveria = `aa: addUserRooms(uuid:"${this.userGettingRegisteredUuid}",rooms:"b1705af0-c7c7-11e8-85a9-0242ac110002")`
        } else {
          this.roomQeveria = ''
        }

        if (registerUserForm["PS"] == true) {
          this.roomPS = `bb: addUserRooms(uuid:"${this.userGettingRegisteredUuid}",rooms:"f23af4e0-c719-11e8-85a9-0242ac110002")`
        } else {
          this.roomPS = ''
        }

        if (registerUserForm["FRESH"] == true) {
          this.roomFresh = `cc: addUserRooms(uuid:"${this.userGettingRegisteredUuid}",rooms:"ad702f70-c7c7-11e8-85a9-0242ac110002")`
        } else {
          this.roomFresh = ''
        }

        let json = {
          query: `
            mutation{
              ${this.roomQeveria}
              ${this.roomPS}
              ${this.roomFresh}
              dd: addGroupUsers(uuid:"${this.userGroup}", users:"${this.userGettingRegisteredUuid}")
              ee: updateUser(uuid:"${this.userGettingRegisteredUuid}", isDeleted: false)
            }
          `
        }
        this.http.post(this.baseUrl, json).subscribe(
          x => {
            if (x["dd"]) {
              this.alertify.success("Përdoruesi u krijua me sukses")
            } else {
              this.alertify.error("Përdoruesi nuk u krijua")
            }
          }
        )
      },
      error => {
        this.alertify.error("Përdoruesi nuk u krijua")
      })
  }

  getSpecificUser(uuid){
    let json = {
      query: `
      {
        User(filter:{uuid:"${uuid}"}){
          uuid
          username
          name
          email
          tel
          qarku
          bashkia
          ministria
          rooms{
            name
          }
          groups{
            name
          }
        }
      }
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  saveSpecificUser(specificUser, PS, FRESH, QEVERI, userGroup1){

    let roomPS;
    let roomQEVERI;
    let roomFRESH;
    let userGroup;

    if (PS == true) {
      roomPS = `aa: addUserRooms(uuid:"${specificUser["uuid"]}",rooms:"f23af4e0-c719-11e8-85a9-0242ac110002")`
    } else if(PS == false) {
      roomPS = `aa: deleteUserRooms(uuid:"${specificUser["uuid"]}",rooms:"f23af4e0-c719-11e8-85a9-0242ac110002")`
    }

    if (FRESH == true) {
      roomFRESH = `bb: addUserRooms(uuid:"${specificUser["uuid"]}",rooms:"ad702f70-c7c7-11e8-85a9-0242ac110002")`
    } else if(FRESH == false) {
      roomFRESH = `bb: deleteUserRooms(uuid:"${specificUser["uuid"]}",rooms:"ad702f70-c7c7-11e8-85a9-0242ac110002")`
    }

    if (QEVERI == true) {
      roomQEVERI = `cc: addUserRooms(uuid:"${specificUser["uuid"]}",rooms:"b1705af0-c7c7-11e8-85a9-0242ac110002")`
    } else if(QEVERI == false) {
      roomQEVERI = `cc: deleteUserRooms(uuid:"${specificUser["uuid"]}",rooms:"b1705af0-c7c7-11e8-85a9-0242ac110002")`
    }

    if(userGroup1=="cbe35d50-c6f6-11e8-85a9-0242ac110002"){
      userGroup= `dd: addGroupUsers(uuid:"cbe35d50-c6f6-11e8-85a9-0242ac110002", users:"${specificUser["uuid"]}")
                   ee: deleteGroupUsers(uuid:"ad6764c0-9983-11e8-85a9-0242ac110002", users:"${specificUser["uuid"]}")`
    }else if(userGroup1=="ad6764c0-9983-11e8-85a9-0242ac110002"){
      userGroup= `dd: addGroupUsers(uuid:"ad6764c0-9983-11e8-85a9-0242ac110002", users:"${specificUser["uuid"]}")
                   ee: deleteGroupUsers(uuid:"cbe35d50-c6f6-11e8-85a9-0242ac110002", users:"${specificUser["uuid"]}")`
    }

    let json = {
      query: `
      mutation{
       ${roomPS}
       ${roomFRESH}
       ${roomQEVERI}
       ${userGroup}
       ff: updateUser(uuid:"${specificUser["uuid"]}", username:"${specificUser["username"]}", name:"${specificUser["name"]}", email:"${specificUser["email"]}", tel:"${specificUser["tel"]}", qarku:"${specificUser["qarku"]}", bashkia:"${specificUser["bashkia"]}", ministria:"${specificUser["ministria"]}")
      }
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  deleteUser(uuid) {
    let json = {
      query: `
    mutation{
      deleteUser(uuid:"${uuid}")
    }
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  deleteUserSoft(uuid){
    let json = {
      query: `
    mutation{
      updateUser(uuid:"${uuid}", isDeleted:true)
    }
    `
    }
    return this.http.post(this.baseUrl, json).map((res: Response) => res);
  }

  changePass(user, changePass){
    let obj = {
      "username": user.username,
      "password": changePass["passworldOld"],
      "newPassword": changePass["passworldNew"]
    }
    return this.http.post(this.changePassUrl, obj).map((res: Response)=> res);
  }

}
