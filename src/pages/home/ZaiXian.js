import React, { Component } from 'react';
import {  WingBlank, SearchBar, Grid, Flex } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { sk_user_token } from '@/config/StorageKeys';
import liest1 from '@/assets/img/c3.png';
import liest2 from '@/assets/img/c5.png';
import liest3 from '@/assets/img/c6.png';
import liest4 from '@/assets/img/c7.png';
import liest5 from '@/assets/img/c8.png';
import delte from '@/assets/img/delete.png';
import styles from '@/pages/home/index.css';



class ZaiXian extends Component {
  state = {
    UserValue:'',
    contentData:'',
    sousuodata:[],
    remen:['国产','日韩','欧美','幼女','强奸','动漫','三级','乱伦','人兽','美女','人妻','偷拍','内射','制服','口交','处女','巨乳','性虐','明星','热播','自拍','野战','高清','重口味']
  };

  componentDidMount(){

  }




  saveBD=val=>{
    var a = []
    const shousuo = window.localStorage.getItem('shousuo');
    if(shousuo != undefined ||shousuo!=null ){
      a = shousuo.split(',')
      a.push(val)
    }else{
      var a = []
    }
    localStorage.setItem('shousuo', a);
  };


  delesosuo=()=>{
    localStorage.setItem('shousuo', '');
  }

  render() {
    var dataaaa = []

     const shousuo = window.localStorage.getItem('shousuo');
    if(shousuo!=null){
      shousuo.split(',').map(i=>dataaaa.push(i))
    }


    const{remen} = this.state;

    const listdata = [
      { 'name': '国产', 'imgPath': `${liest1}` },
      { 'name': '日韩', 'imgPath': `${liest2}` },
      { 'name': '欧美', 'imgPath': `${liest3}` },
      { 'name': '动漫', 'imgPath': `${liest4}` },
      { 'name': '人兽', 'imgPath': `${liest5}` }
      ]

    const data = listdata.map((i) => ({
      icon: `${i.imgPath}`,
      text: `${i.name}`,
    }));


    return (
      <div>
        <div style={{ backgroundColor: '#ffffff' }}>

          <WingBlank size="sm">
            <Grid columnNum={5} data={data} hasLine={false}/>
          </WingBlank>
        </div>
        <WingBlank>
           <SearchBar placeholder="搜索关键字例如:人兽、强奸..." onSubmit={value => this.saveBD(value)}/>
        </WingBlank>
        <div style={{backgroundColor:'#ffffff', width:'100%', height:'100%'}}>
          <WingBlank>
            <Flex justify="between">
              <span style={{fontSize:17}}>历史搜索</span>
              <img style={{width:30}} onClick={()=>this.delesosuo()} src={delte} alt=''/>
            </Flex>
          </WingBlank>
        </div>
        <div className={styles.itemContain}>
          {
            dataaaa && dataaaa.length > 0 && dataaaa.map((item2, index2) => {
              return (
                item2===""||item2===null?null:
                  <button className={styles.btn}
                >{item2}</button>
              );
            })
          }
        </div>

        <div style={{ backgroundColor: '#ffffff', width: '100%', height: '100%' }}>
          <WingBlank>
            <Flex justify="start">
              <span style={{ fontSize: 17 }}>热门搜索</span>
            </Flex>
          </WingBlank>
        </div>



         <div className={styles.itemContain}>
          {
            remen && remen.length > 0 && remen.map((item2, index2) => {
              return (
                item2===""||item2===null?null:
                  <button className={styles.btn2}
                >{item2}</button>
              );
            })
          }
        </div>
      </div>

    );
  }
}


const EditHeaderSend = createForm()(ZaiXian);
export default connect(({ header }) => ({header}))(EditHeaderSend);
