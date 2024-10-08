import React from 'react';
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.min.css';
import 'spectre.css/dist/spectre-exp.min.css';
import Layout from './Layout';

class ImgPage extends React.Component {
  constructor(props) {
    super(props);

    const bits = window.location.pathname.split('/');

    this.state = {
      loading: false,
      img: {
        id: bits[bits.length - 1],
        url: this.getImgUrl(bits[bits.length - 1])
      }
    };
  }

  getImgUrl(id) {
    switch (id) {
        case '1':
            return '/one.png';
        case '2':
            return '/three.png';
        case '3':
            return '/four.png';
        case '4':
            return '/two.png';
        default:
            return '/sad_panda.gif';
        }
  }

  render() {
    if (this.state.error) {
      throw Error('unable to get img');
    }
    const myImg = (
      <div id='myImg' style={{ alignContent: 'center' }}>
        <img src={this.state.img.url} alt="img" style={{ maxWidth: '50vw' }} />
      </div>
    );

    return (
      <Layout>
        <a href="/img/1">Image_1</a>&nbsp;
        <a href="/img/2">Image_2</a>&nbsp;
        <a href="/img/3">Image_3</a>&nbsp;
        {/* <a href="/img/4">Image_4</a>&nbsp; */}
        <div style={{ marginBottom: '10px' }}/>
        {myImg}
      </Layout>
    );
  }
}

export default ImgPage;
