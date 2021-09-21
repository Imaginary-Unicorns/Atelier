const React = require('react');
import axios from 'axios';
import JustQuestion from './JustQuestion.jsx';
import MoreAnswer from './MoreAnswers.jsx';

class OneQA extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    const {allAns, oneQues} = this.props;
    console.log('ONE QA--->', allAns, oneQues);

    return (
      <div className="oneQA">

        <div className="oneQuestion">
          <JustQuestion oneQues={oneQues} productName={this.props.productName}/>
        </div>
        <div className="oneAnswer1">
            <MoreAnswer allAns={allAns} oneQues={oneQues}/>
        </div>

      </div>
    );
  }
}

export default OneQA;