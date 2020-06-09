import React, { Component } from 'react';
import {  WingBlank, WhiteSpace, SearchBar, Grid, Flex } from 'antd-mobile';
import { connect } from 'dva';
import { createForm } from 'rc-form';

import liest1 from '@/assets/img/c3.png';
import liest2 from '@/assets/img/c5.png';
import liest3 from '@/assets/img/c6.png';
import liest4 from '@/assets/img/c7.png';
import liest5 from '@/assets/img/c8.png';
import delte from '@/assets/img/delete.png';
import styles from '@/pages/home/index.css';
import router from 'umi/router';



class ZaiXian extends Component {
  state = {
    UserValue:'',
    contentData:'',
    sousuodata:[],
    remen:['国产','日韩','欧美','幼女','强奸','动漫','三级','乱伦','人兽','美女','人妻','偷拍','内射','制服','口交','处女','巨乳','性虐','明星','热播','自拍','野战','高清','重口味']
  };

  componentDidMount(){
    this.historySearch()
  }

  historySearch = async () => {
    let a = [];
    const shousuo = await window.localStorage.getItem('shousuo');
    if(shousuo != undefined ||shousuo!=null ){
      a = shousuo.split(',');
    }
    this.setState({
      sousuodata: a
    });
  };

  SearchValue = value => {
    router.push({
      pathname: '/home/HuaShuList',
      query: {
        filterData: value,
      },
    });
  };

  saveBD = val => {
    let a = [];
    const shousuo = window.localStorage.getItem('shousuo');
    if(shousuo != undefined ||shousuo!=null ){
      a = shousuo.split(',');
      if(a.indexOf(val) === -1) {
        a.push(val)
      }
    }
    this.setState({
      sousuodata: a
    });
    localStorage.setItem('shousuo', a);
    this.SearchValue(val)
  };

  delesosuo=()=>{
    console.log('-------------------')
    localStorage.setItem('shousuo', '');
    this.setState({
      sousuodata: []
    });
  }

  render() {

    const{remen, sousuodata} = this.state;

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
      <div style={{ backgroundColor: '#efefef'}}>
        <Grid columnNum={5} data={data} hasLine={false} onClick={(item) => this.saveBD(item.text)}/>
        <SearchBar placeholder="搜索关键字例如:人兽、强奸..." onSubmit={value => this.saveBD(value)}/>

        <div className={styles.searchbox}>
          <WingBlank>
            <WhiteSpace size={'lg'}/>
            <Flex justify="between">
              <span style={{fontSize:17}}>历史搜索</span>
              <img style={{width:30}} onClick={()=>this.delesosuo()} src={delte} alt=''/>
            </Flex>
            <WhiteSpace size={'lg'}/>
            <Flex wrap={'wrap'} justify={'start'}>
              {
                sousuodata && sousuodata.length > 0 && sousuodata.map((item2, index2) => {
                  if(item2) {
                    return (
                      <button
                        key={item2}
                        className={styles.btn}
                        onClick={() => this.saveBD(item2)}
                      >
                        {item2}
                      </button>
                    );
                  }
                })
              }
            </Flex>

            <WhiteSpace size={'xl'}/>

            <Flex justify="start">
              <span style={{ fontSize: 17 }}>热门搜索</span>
            </Flex>
            <WhiteSpace size={'lg'}/>
            <Flex wrap={'wrap'} justify={'between'}>
              {
                remen && remen.length > 0 && remen.map((item2, index2) => {
                  if(item2) {
                    return (
                      <button
                        key={item2}
                        className={styles.btn2}
                        onClick={() => this.saveBD(item2)}
                      >
                        {item2}
                      </button>
                    );
                  }
                })
              }
            </Flex>
          </WingBlank>
        </div>

      </div>

    );
  }
}


const EditHeaderSend = createForm()(ZaiXian);
export default connect(({ header }) => ({header}))(EditHeaderSend);
