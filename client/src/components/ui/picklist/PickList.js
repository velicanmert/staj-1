import React, { Component } from 'react';
import './PickList.css';

class Picklist extends Component {
  state = { sourceArr: [], targetArr: [] };

  setSourceAndTargetArrays = () => {
    let sourceArr = [];
    if (this.props.sourceArray && this.props.sourceArray.length > 0) {
      sourceArr = this.props.sourceArray.map(item => {
        return { clicked: false, value: item };
      });
    }
    let targetArr = [];
    if (this.props.targetArray && this.props.targetArray.length > 0) {
      targetArr = this.props.targetArray.map(item => {
        return { clicked: false, value: item };
      });
    }
    this.setState({ sourceArr, targetArr });
  };

  componentDidMount() {
    this.setSourceAndTargetArrays();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (
      this.props.sourceArray !== prevProps.sourceArray ||
      this.props.targetArray !== prevProps.targetArray
    ) {
      this.setSourceAndTargetArrays();
    }
  }

  itemClicked = (arr, item) => {
    const newArr = arr.map(element => {
      if (element.value === item.value) {
        element.clicked = true;
      } else {
        element.clicked = false;
      }
      return element;
    });
    return newArr;
  };

  sourceItemClicked = item => {
    // console.log(`item: ${item.value}`);
    const sourceArr = this.itemClicked(this.state.sourceArr, item);
    this.setState({ sourceArr });
  };

  targetItemClicked = item => {
    // console.log(`item: ${item.value}`);
    const targetArr = this.itemClicked(this.state.targetArr, item);
    this.setState({ targetArr });
  };

  moveFromSourceToTarget = (itemsToBeMoved, itemsToBeKept) => {
    if (itemsToBeMoved.length === 0) {
      return;
    }

    const updatedTargetArr = [...this.state.targetArr];
    for (let element of itemsToBeMoved) {
      // Daha onceden sag tarafta (targetProjects) bir sekilde bu eleman varsa, duplicate olusturmayalim:
      if (!updatedTargetArr.find(el => el.value === element.value)) {
        updatedTargetArr.push({ clicked: false, value: element.value });
      }
    }

    this.setState({ sourceArr: itemsToBeKept, targetArr: updatedTargetArr });
    this.props.onChange({
      sourceArray: itemsToBeKept.map(el => el.value),
      targetArray: updatedTargetArr.map(el => el.value)
    });
  };

  moveFromTargetToSource = (itemsToBeMoved, itemsToBeKept) => {
    if (itemsToBeMoved.length === 0) {
      return;
    }

    const updatedSourceArr = [...this.state.sourceArr];
    for (let element of itemsToBeMoved) {
      updatedSourceArr.push({ clicked: false, value: element.value });
    }

    this.setState({ sourceArr: updatedSourceArr, targetArr: itemsToBeKept });
    this.props.onChange({
      sourceArray: updatedSourceArr.map(el => el.value),
      targetArray: itemsToBeKept.map(el => el.value)
    });
  };

  sourceToTarget = () => {
    let itemsToBeMoved = [];
    let itemsToBeKept = [];

    if (this.state.sourceArr && this.state.sourceArr.length > 0) {
      itemsToBeMoved = this.state.sourceArr.filter(
        element => element.clicked === true
      );

      itemsToBeKept = this.state.sourceArr.filter(
        element => element.clicked === false
      );
    }

    this.moveFromSourceToTarget(itemsToBeMoved, itemsToBeKept);
  };

  sourceToTargetAll = () => {
    let itemsToBeMoved = this.state.sourceArr;
    let itemsToBeKept = [];

    this.moveFromSourceToTarget(itemsToBeMoved, itemsToBeKept);
  };

  targetToSource = () => {
    let itemsToBeMoved = [];
    let itemsToBeKept = [];

    if (this.state.targetArr && this.state.targetArr.length > 0) {
      itemsToBeMoved = this.state.targetArr.filter(
        element => element.clicked === true
      );

      itemsToBeKept = this.state.targetArr.filter(
        element => element.clicked === false
      );
    }

    this.moveFromTargetToSource(itemsToBeMoved, itemsToBeKept);
  };

  targetToSourceAll = () => {
    let itemsToBeMoved = this.state.targetArr;
    let itemsToBeKept = [];

    this.moveFromTargetToSource(itemsToBeMoved, itemsToBeKept);
  };

  render() {
    // console.log('[PickList render] state: ', this.state);
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='PickList'>
            <div className='PickList-source'>
              <ul>
                {this.state.sourceArr.length > 0
                  ? this.state.sourceArr.map((element, indx) => {
                      return (
                        <li
                          key={element.value}
                          style={
                            element.clicked ? { backgroundColor: '#ccc' } : null
                          }
                          onClick={() => this.sourceItemClicked(element)}
                        >
                          {element.value}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>

            <div className='PickList-middle'>
              <button onClick={this.sourceToTarget}>{'To Right >'}</button>
              <button onClick={this.targetToSource}>{'< To Left'}</button>
              <button onClick={this.sourceToTargetAll}>
                {'All to Right >>'}
              </button>
              <button onClick={this.targetToSourceAll}>
                {'<< All to Left'}
              </button>
            </div>

            <div className='PickList-target'>
              <ul>
                {this.state.targetArr.length > 0
                  ? this.state.targetArr.map((element, indx) => {
                      return (
                        <li
                          key={element.value}
                          style={
                            element.clicked ? { backgroundColor: '#ccc' } : null
                          }
                          onClick={() => this.targetItemClicked(element)}
                        >
                          {element.value}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </div>
        </div>

        <div className='PickList-create-button-wrapper'>
          <button
            className='PickList-create-button'
            onClick={this.props.onCreateClicked}
          >
            Create Projects
          </button>
        </div>
      </>
    );
  }
}

export default Picklist;
