<template>
    <div class="container">
<!-- 
    현재 페이지는 여름 방학 때 이어서 구현하기.
    프로토타입 발표 때는 새로 만든 페이지로 대체하여 발표.
 -->
        <div style="width:50%; padding-left :0% ; float:left;">
            <div class="btn-group" style="margin-top : 5%;" >
                <button type="button" class="btn btn-primary" @click="searchOn" style = "background-color:grey; color:white;">검색</button>
                <button type="button" class="btn btn-primary" @click="filterOn" style = "background-color:grey; color:white;">필터링</button>
            </div>
            <div v-if="isSearch">
                <h2> Search </h2>
                <div class ="input-group" style="margin-top:6%;">
                    <input type="text" class="form-control" placeholder="ID" v-model="searchUser_id" @keyup.enter ="searchUser(searchUser_id)">
                    <input type="text" class="form-control" placeholder="이름" v-model="searchName" @keyup.enter ="searchUser(searchName)">
                    <input type="text" class="form-control" placeholder="이메일" v-model="searchEmail" @keyup.enter ="searchUser(searchEmail)">
                    <input type="text" class="form-control" placeholder="전화번호" v-model="searchPhone" @keyup.enter ="searchUser(searchPhone)">
                    <input type="text" class="form-control" placeholder="생일" v-model="searchBirth" @keyup.enter ="searchUser(searchBirth)">
                    <input type="text" class="form-control" placeholder="가입일" v-model="searchR_date" @keyup.enter ="searchUser(searchR_date)">
                    <input type="text" class="form-control" placeholder="구독" v-model="searchSubscription" @keyup.enter ="searchUser(searchSubscription)">
                </div>
 
                <span class="input-group-btn">
                    <button class="btn btn-info" type="button" @click="searchUser(str)"> 검색 </button>
                </span>
                <br>
 
                <ul class="list-group">
                    <li class="list-group-item" v-for="(user) in searchUsers" v-bind:key="user">
                        <strong>ID : </strong>{{ user.user_id }} <strong>이름 : </strong>{{ user.name }} <strong>이메일 : </strong>{{ user.email }} <strong>전화번호 : </strong>{{ user.phone }} <strong>생일 : </strong>{{ user.birth }}  <strong>  가입일 : </strong> {{ user.r_date }} <strong>  구독 : </strong> {{ user.subscription }}
                    </li>
                </ul>
            </div>
            <div v-if="!isSearch">
                <h2> Filtering </h2>
                <div class ="input-group" style="margin-top:5%;">
                
                <div class ="input-group" style="margin-top:2%; width:540%" >
                    <input type="text" class="form-control" placeholder="이곳에 입력하세요." v-model="filterText">
                </div>
                </div>
                <ul class="list-group">
                    <li class="list-group-item" v-for="(user) in filterUsers" v-bind:key="user">
                        <strong>ID : </strong>{{ user.user_id }} <strong>이름 : </strong>{{ user.name }} <strong>이메일 : </strong>{{ user.email }} <strong>전화번호 : </strong>{{ user.phone }} <strong>생일 : </strong>{{ user.birth }}  <strong>  가입일 : </strong> {{ user.r_date }} <strong>  구독 : </strong> {{ user.subscription }}
                    </li>
                </ul>
            </div>
        </div>
        <div style="width:50%; padding-right : 10%; float:left;">
            <br><br>
            <h2> User Management </h2>
            <div class ="input-group" style="margin-bottom:6%;">
                <input type="text" class="form-control" placeholder="ID" v-model="name" @keyup.enter ="createUser(user_id)">
                <input type="text" class="form-control" placeholder="이름" v-model="age" @keyup.enter ="createUser(name)">
                <input type="text" class="form-control" placeholder="이메일" v-model="sex" @keyup.enter ="createUser(email)">
                <input type="text" class="form-control" placeholder="전화번호" v-model="sex" @keyup.enter ="createUser(phone)">
                <input type="text" class="form-control" placeholder="생일" v-model="sex" @keyup.enter ="createUser(birth)">
                <input type="text" class="form-control" placeholder="가입일" v-model="sex" @keyup.enter ="createUser(r_date)">
                <input type="text" class="form-control" placeholder="구독" v-model="sex" @keyup.enter ="createUser(subscription)">
            </div>
 
            <span class="input-group-btn">
                <button class="btn btn-success" type="button" @click="createUser(str)"> 추가 </button>
            </span>
 
            <div v-if="isModify">
                <input type="text" class="form-control" placeholder="ID" v-model="modifyName" @keyup.enter ="modifyUser(modifyUser_id)">
                <input type="text" class="form-control" placeholder="이름" v-model="modifyName" @keyup.enter ="modifyUser(modifyName)">
                <input type="text" class="form-control" placeholder="이메일" v-model="modifyName" @keyup.enter ="modifyUser(modifyEmail)">
                <input type="text" class="form-control" placeholder="전화번호" v-model="modifyAge" @keyup.enter ="modifyUser(modifyPhone)">
                <input type="text" class="form-control" placeholder="생일" v-model="modifySex" @keyup.enter ="modifyUser(modifyBirth)">
                <input type="text" class="form-control" placeholder="가입일" v-model="modifySex" @keyup.enter ="modifyUser(modifyR_date)">
                <input type="text" class="form-control" placeholder="구독" v-model="modifySex" @keyup.enter ="modifyUser(modifySubscription)">
                <button class="btn btn-success" type="button" @click="modifyUser(modifyStr)"> 수정완료 </button>
            </div>
            <br>
 
            <ul class="list-group">
                <li class="list-group-item" v-for="(user, index) in pageUsers[curpageNumber]" v-bind:key="user">
                    <strong>ID : </strong>{{ user.user_id }} <strong>이름 : </strong>{{ user.name }} <strong>이메일 : </strong>{{ user.email }} <strong>전화번호 : </strong>{{ user.phone }} <strong>생일 : </strong>{{ user.birth }}  <strong>  가입일 : </strong> {{ user.r_date }} <strong>  구독 : </strong> {{ user.subscription }}
                    <div class="btn-group pull-right" style="font-size: 12%; line-height: 1;">
                        <button type="button" class="btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            더보기 <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a href="#" @click="modifyUser(index)"> 수정 </a></li>
                            <li><a href="#" @click="deleteUser(index)"> 삭제 </a></li>
                        </ul>
                    </div>
                </li>
            </ul>
            <button type="button" class="btn btn-warning" @click="pagePrev">◀ prev</button>
            <button type="button" class="btn btn-warning" @click="pageNext">next ▶</button>
        </div>
 
        
        
    </div>
</template>
 
<script>    
    export default {
        name: 'Admin',
        props: ['msg'],
        data(){ 
            return {
                str:{
                    user_id:null,
                    name:null,
                    email:null,
                    phone:null,
                    birth:null,
                    r_date:null,
                    subscription:null,
                },
 
                user_id:null,
                name:null,
                email:null,
                phone:null,
                birth:null,
                r_date:null,
                subscription:null,
                users: [
                    {
                        user_id:"abc",
                        name:"가나다",
                        email:"abc@gmail.com",
                        phone:"010123456",
                        birth:"990303",
                        r_date:"21.01.01",
                        subscription:"A",
                    },
                    {
                        user_id:"def",
                        name:"라마바",
                        email:"def@gmail.com",
                        phone:"010234567",
                        birth:"980404",
                        r_date:"20.12.21",
                        subscription:"C",
                    },
                    {
                        user_id:"ghi",
                        name:"사아자",
                        email:"ghi@gmail.com",
                        phone:"010345678",
                        birth:"970505",
                        r_date:"21.02.29",
                        subscription:"B",
                    },
                    {
                        user_id:"jkl",
                        name:"차카타",
                        email:"jkl@gmail.com",
                        phone:"010456789",
                        birth:"960606",
                        r_date:"21.03.21",
                        subscription:"A",
                    },
                    {
                        user_id:"mno",
                        name:"타파하",
                        email:"mno@gmail.com",
                        phone:"010567890",
                        birth:"950707",
                        r_date:"21.05.21",
                        subscription:"B",
                    },
                    {
                        user_id:"pqr",
                        name:"하호후",
                        email:"pqr@gmail.com",
                        phone:"010678901",
                        birth:"940808",
                        r_date:"21.06.01",
                        subscription:"C",
                    },
                ],
 
                isModify: false,
                modifyStr:{
                    user_id:null,
                    name:null,
                    email:null,
                    phone:null,
                    birth:null,
                    r_date:null,
                    subscription:null,
                },
 
                modifyUser_id:null,
                modifyName:null,
                modifyEmail:null,
                modifyPhone:null,
                modifyBirth:null,
                modifyR_date:null,
                modifySubscription:null,
                modifyIdx:null,
 
 
                isSearch:true,
 
                searchStr:{
                    user_id:null,
                    name:null,
                    email:null,
                    phone:null,
                    birth:null,
                    r_date:null,
                    subscription:null,
                },
 
                searchUser_id:null,
                searchName:null,
                searchEmail:null,
                searchPhone:null,
                searchBirth:null,
                searchR_date:null,
                searchSubscription:null,
 
                searchText:null,
                searchUsers: [],
 

                filterText:null,
                filterUsers: [],
 
                usersNumber: 0, 
                curpageNumber: 1,
                maxpageNumber: 1,
                pageUsers: [[]],
            }
        },
 
        created:function(){
            this.usersNumber = this.users.length;
 
            this.pageUsers = [[]];
            this.maxpageNumber = this.usersNumber / 10 + 1;
            for(var i = 0; i < this.maxpageNumber; i++)
                this.pageUsers.push([]);
 
            var page = 1;
            var num = 0;
            for(var j = 0; j < this.usersNumber; j++){
                this.pageUsers[page].push(this.users[j]);
                num++;
                if(num == 10){
                    num = 0;
                    page++;
                }
            }
        },
        methods:{
            deleteUser:function(index){
                this.users.splice(index,1);
                this.usersNumber--;
            },
 
            createUser:function(val){
                this.users.push({ user_id: val.user_id, name: val.name, email: val.email, phone: val.phone, birth: val.birth, r_date: val.r_date, subscription: val.subscription });
                this.usersNumber++;
 
                this.pageUsers = [[]];
                this.maxpageNumber = this.usersNumber / 10 + 1;
                for(var i = 0; i < this.maxpageNumber; i++)
                    this.pageUsers.push([]);
 
                var page = 1;
                var num = 0;
                for(var j = 0; j < this.usersNumber; j++){
                    this.pageUsers[page].push(this.users[j]);
                    num++;
                    if(num == 10){
                        num = 0;
                        page++;
                    }
                }
            },
 
            modifyUser:function(val){
                if(!this.isModify)
                {
                    this.isModify = true;
                    this.modifyIdx = val;
                }
                else{
                    if(val.user_id === undefined || val.name === undefined || val.email === undefined || val.phone === undefined || val.birth === undefined || val.r_date === undefined || val.subscription === undefined )
                    {
                        this.modifyIdx = val;
                        return;
                    }    
                    this.users[this.modifyIdx] = { user_id: val.user_id, name: val.name, email: val.email, phone: val.phone, birth: val.birth, r_date: val.r_date, subscription: val.subscription };
                    this.isModify = false;
                    
                    this.modifyUser_id = null;
                    this.modifyName = null;
                    this.modifyEmail = null;
                    this.modifyPhone = null;
                    this.modifyBirth = null;
                    this.modifyR_date = null;
                    this.modifySubscription = null;
                    this.modifyIdx = null;
                }
                this.setUsers();
            },
 
            searchOn:function(){
                this.isSearch = true;
            },
 
            searchUser:function(){
                this.searchUsers = [];
                var JSONstr = JSON.stringify(this.searchStr);
                for(var i = 0 ; i < this.users.length; i++){
                    var JSONusers = JSON.stringify(this.users[i]);
 
                    if(JSONstr == JSONusers){
                        this.searchUsers.push(this.users[i]);
                    }
                }

            },
 
            filterOn:function(){
                this.isSearch = false;
            },
 
            pagePrev:function(){
                if(this.curpageNumber - 1 > 0)
                    this.curpageNumber--;
            },
            pageNext:function(){
                if(this.curpageNumber + 1 <= this.maxpageNumber)
                    this.curpageNumber++;
            },
 
            setUsers:function(){
                this.pageUsers = [[]];
                this.maxpageNumber = this.usersNumber / 10 + 1;
                for(var i = 0; i < this.maxpageNumber; i++)
                    this.pageUsers.push([]);
 
                var page = 1;
                var num = 0;
                for(var j = 0; j < this.usersNumber; j++){
                    this.pageUsers[page].push(this.users[j]);
                    num++;
                    if(num == 10){
                        num = 0;
                        page++;
                    }
                }
            }
        },
 
        watch:{
            user_id:function(){
                this.str.user_id = this.user_id;
            },
            name:function(){
                this.str.name = this.name;
            },
            email:function(){
                this.str.email = this.email;
            },
            phone:function(){
                this.str.phone = this.phone;
            },
            birth:function(){
                this.str.birth = this.birth;
            },
            r_date:function(){
                this.str.r_date = this.r_date;
            },
            subscription:function(){
                this.str.subscription = this.subscription;
            },

 
            modifyUser_id:function(){
                this.modifyStr.user_id = this.modifyUser_id;
            },
            modifyName:function(){
                this.modifyStr.name = this.modifyName;
            },
            modifyEmail:function(){
                this.modifyStr.email = this.modifyEmail;
            },
            modifyPhone:function(){
                this.modifyStr.phone = this.modifyPhone;
            },
            modifyBirth:function(){
                this.modifyStr.birth = this.modifyBirth;
            },
            modifyR_date:function(){
                this.modifyStr.r_date = this.modifyR_date;
            },
            modifySubscription:function(){
                this.modifyStr.subscription = this.modifySubscription;
            },
 
 
            searchUser_id:function(){
                this.searchStr.user_id = this.searchUser_id;
            },
            searchName:function(){
                this.searchStr.name = this.searchName;
            },
            searchEmail:function(){
                this.searchStr.email = this.searchEmail;
            },
            searchPhone:function(){
                this.searchStr.phone = this.searchPhone;
            },
            searchBirth:function(){
                this.searchStr.birth = this.searchBirth;
            },
            searchR_date:function(){
                this.searchStr.r_date = this.searchR_date;
            },
            searchSubscription:function(){
                this.searchStr.subscription = this.searchSubscription;
            },
 
            filterText:function(){
                this.filterUsers=[];
                if(this.filterText === '')
                    return;
                for(var i = 0 ; i < this.users.length; i++){
                    if(this.users[i].user_id === undefined || this.users[i].name === undefined || this.users[i].email === undefined || this.users[i].phone === undefined || this.users[i].birth === undefined || this.users[i].r_date === undefined || this.users[i].subscription === undefined )
                        continue;
                    if(this.users[i].user_id === null || this.users[i].name === null || this.users[i].email === null || this.users[i].phone === null || this.users[i].birth === null || this.users[i].r_date === null || this.users[i].subscription === null)
                        continue;
                    if(this.users[i].user_id.includes(this.filterText) || this.users[i].name.includes(this.filterText) || this.users[i].email.includes(this.filterText) || this.users[i].phone.includes(this.filterText) || this.users[i].birth.includes(this.filterText) || this.users[i].r_date.includes(this.filterText) || this.users[i].subscription.includes(this.filterText)){
                        this.filterUsers.push(this.users[i]);
                    }
                }
            },
 
            users:function(){    
                this.pageUsers = [[]];
                this.maxpageNumber = this.usersNumber / 10 + 1;
                for(var i = 0; i < this.maxpageNumber; i++)
                    this.pageUsers.push([]);
 
                var page = 1;
                var num = 0;
                for(var j = 0; j < this.usersNumber; j++){
                    this.pageUsers[page].push(this.users[j]);
                    num++;
                    if(num == 10){
                        num = 0;
                        page++;
                    }
                }
 
            }
        }
 
    }
</script>

<style lang="" scoped>
    
</style>