

class App extends React.Component {
    constructor() {
      super();
      this.state = {
               appName: 'Oasis',
        list: undefined,
      }
    }
    searchData(e) {
      var queryData = [];
      if(e.target.value != '') {
        this.state.data.forEach(function(person) {
  
            if(person.toLowerCase().indexOf(e.target.value)!=-1) {
              if(queryData.length < 10) {
                queryData.push(person);
              }
            }
        });
      }
      this.setState({list: queryData});
    }
    render() {
      return(
        <div>
          <Header name={this.state.appName} />
          <SearchBar search={this.searchData.bind(this)} />
          {(this.state.list) ? <SearchResult data={this.state.list} /> : null  }
        </div>
      )
    }
  }
  
  class Header extends React.Component {
    render() {
      return(
        <div>
          <h1>{this.props.name}</h1>
        </div>
      )
    }
  }
  
  class SearchBar extends React.Component {
    render() {
      return(
        <div>
          <input onChange={this.props.search} placeholder="Search Notes"/>
        </div>
      )
    }
  }
  
  class SearchResult extends React.Component {
  
    render() {
      return (
        <div>
          <ul>
            {this.props.data.map(function(value) {
                return <Item key={value} val={value} />
            })}
          </ul>
        </div>
      )
  
    }
  
  }
  
  class Item extends React.Component {
    render() {
      return(
        <li>
          {this.props.val}
        </li>
      )
    }
  
  }
  
  
  
  ReactDOM.render(<App />, document.getElementById('app'));
  