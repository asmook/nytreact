import React, {Component} from 'react'
import API from "../utils/API"
import Results from "./Results"
import Saved from "./Saved"

class SearchForm extends Component {

    state = {
        topic: "",
        startYear: "",
        endYear: "",
        articles: [],
        saved: []
    }

    componentDidMount() {
        this.getSavedArticles()
      }
    
      getSavedArticles = () => {
        API.getSaved()
          .then((res) => {
            this.setState({ saved: res.data});
            console.log(res.data)
          });
          console.log(this.state.saved)
      }

    handleInputChange = event => {
        let value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state)

        this.search(this.state.topic,this.state.startYear,this.state.endYear)

        this.setState({
            topic: "",
            startYear: "",
            endYear: ""
        })
    }

    search = (topic,start,end) => {
        API.getArticles(topic,start,end)
        .then(res => {
            console.log(res.data.response.docs)
            
            this.setState({
                articles: [res.data.response.docs[0],res.data.response.docs[1],res.data.response.docs[2],res.data.response.docs[3],res.data.response.docs[4]]
            })
            
            console.log(this.state.articles)
        })
    }

    handleSaveButton = id => {
        const findId = this.state.articles.find(article => article._id === id)
        console.log(findId)

        const savedArticle = {title: findId.headline.main, url: findId.web_url}

        API.saveArticle(savedArticle).then(res => console.log(res))

        this.getSavedArticles()
    }

    handleDeleteButton = id => {
        const findId = this.state.saved.find(save => save._id === id)

        console.log(findId)

        API.deleteSaved(findId._id).then(res => console.log(res))

        this.getSavedArticles()
    }



render() {
    return (
        <div className="container">
            <div className="card">
                <div className="card-header text-center">
                Search
                </div>
            <div className="card-body text-center">
            <form>
                <div className="form-group">
                    <label htmlFor="topic">Topic</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="topic"
                        name="topic"
                        onChange= {this.handleInputChange}
                        value={this.state.topic}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startYear">Start Year</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="startYear"
                        name="startYear"
                        onChange= {this.handleInputChange}
                        value={this.state.startYear}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endYear">End Year</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="endYear"
                        name="endYear"
                        onChange= {this.handleInputChange}
                        value={this.state.endYear}
                    />
                </div>
                <button className="btn btn-primary" onClick={this.handleFormSubmit}>Search</button>
            </form>
            </div>
            </div>
            <div className="mt-5">
                <div className="card">
                    <div className="card-header text-center">
                        Results
                    </div>
                    <div className="card-body">
                        {this.state.articles.map(article => (
                            <Results
                                key={article._id}
                                id={article._id}
                                title={article.headline.main}
                                url={article.web_url}
                                description={article.snippet}
                                handleSaveButton={this.handleSaveButton}
                            />

                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <div className="card">
                    <div className="card-header text-center">
                        Saved Articles
                    </div>
                    <div className="card-body">
                        {this.state.saved.map(save => (
                            <Saved
                                key={save.title}
                                id={save._id}
                                title={save.title}
                                url={save.url}
                                description={save.date}
                                handleDeleteButton={this.handleDeleteButton}
                            />

                        ))}
                    </div>
                </div>
            </div>
            
        </div>  

        )
    }
}

export default SearchForm;