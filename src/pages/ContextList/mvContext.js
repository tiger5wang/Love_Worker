
import React, {Component} from 'react';
import styles from '@/pages/wordsList/index.css';
import { Flex, Icon, Toast } from 'antd-mobile';
import router from 'umi/router';
import { connect } from 'dva';


class mvContext extends Component {


  state={

  }


  componentDidMount(){
  }



  ContextRouter = () => {
    router.push({
      pathname: '/',
    });
  };

  render() {


    return (
      <div>
        <div className={styles.header}>

          <Flex justify="start">
            <div >
              <Icon onClick={() => this.ContextRouter()} color='#fff' type="left" size='lg'/>
            </div>
            <span className={styles.headerFont} style={{fontSize:20}}>{this.props.location.query.Title}</span>
          </Flex>
        </div>
        <div style={{marginTop:50}}>
           <p style={{fontSize: 20, lineHeight: 2.5, marginTop: 10,margin: 34}}>
             课程名称: {this.props.location.query.Title}
           </p>
           <p style={{fontSize: 20, lineHeight: 2.5, marginTop: 20,margin: 34}}>
             课程通道: <a href={this.props.location.query.Url} target="_Blank">点击我进入课程</a>
           </p>
        </div>
      </div>
    );
  }
}

export default connect(({postContext}) => ({
  postContext
}))(mvContext)
