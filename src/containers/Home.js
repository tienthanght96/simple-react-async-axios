import React from 'react';
import { connect } from 'react-redux';
import BannerHome from '../components/BannerHome';



class Home extends React.Component {
  render() {
    return (
      <div className="home-page">
        <BannerHome appName={this.props.appName} token={this.props.token}/>
        <div className="container page">
          <div className="row">
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;
