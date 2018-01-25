import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Divider, Comment } from "semantic-ui-react";
import { Input, Icon, Form } from "semantic-ui-react";
import { createNote, deleteNote } from "../actions/data";

class NotesContainer extends Component {
  state = { content: "", filter: false };

  handleDelete = id => {
    this.props.deleteNote(id);
  };

  handleSubmit = e => {
    const stage = this.props.app.stage;
    e.preventDefault();
    const notePayload = {
      note: {
        content: this.state.content,
        stage_id: stage.id
      }
    };
    this.props.createNote(notePayload);
    this.setState({ content: "" });
  };

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  activeNotes = () => {
    const stage = this.props.app.stage;
    return stage.notes.map(note => {
      return (
        <Comment key={note.id}>
          <Comment.Content>
            <Comment.Metadata>
              {moment(note.created_at).format(`MMM, Do  h:mm`)}
            </Comment.Metadata>
            <Comment.Text>{note.content}</Comment.Text>
            <Comment.Actions>
              <Comment.Action
                name={note.id}
                onClick={() => this.handleDelete(note.id)}
              >
                Delete
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      );
    });
  };

  allNotes = () => {
    const stages = this.props.app.stages;
    const notes = stages.map(stage => {
      return stage.notes.map(note => {
        return (
          <Comment key={note.id}>
            <Comment.Content>
              <Comment.Metadata>
                {moment(note.created_at).format(`MMM, Do  h:mm`)}
              </Comment.Metadata>
              <Comment.Text>{note.content}</Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={this.handleDelete}>
                  Delete
                </Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        );
      });
    });
    return [...notes];
  };

  render() {
    return (
      <div className="application-notes-container">
        <h3>Notes</h3>
        <Divider />
        <div className="notes">
          <Comment.Group minimal>{this.activeNotes()}</Comment.Group>
        </div>
        <Form style={{ width: "100%" }} onSubmit={this.handleSubmit}>
          <Input
            style={{ width: "85%", position: "bottom" }}
            value={this.state.content}
            onChange={this.handleChange}
            placeholder="Add a Note!"
            action={{ icon: "chevron up" }}
          />
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { app: state.activeApplication };
}

export default connect(mapStateToProps, { createNote, deleteNote })(
  NotesContainer
);
