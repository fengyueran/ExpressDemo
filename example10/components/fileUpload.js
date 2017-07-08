import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Line } from 'rc-progress';

class FilePreview extends Component {
  render() {
    const { progress } = this.props;
    return (
      <div className="preview-item">
       <div>
         <div className="filename-space">{this.props.data.name}</div>
         <div className="progress">
           <div style={{ width:"100%" }}>
             <Line  style={{marginLeft: 2, marginTop:8 }} percent={progress} strokeWidth="1" strokeColor="#367EED" trailColor="#dddddd" trailWidth="1" />
           </div>
           <div className="progress-num">{progress}%</div>
         </div>
       </div>
       <div className="inputtext">
         <input type="text" name="bundle" id="bundle"  ref="bundle" placeholder="bundle id"/>
       </div>
        <button className="btn"
                onClick={this.props.onRemove}>
          <span>remove</span>
        </button>
        <button className="btn"
                onClick={this.props.onUpload}>
          <span>upload</span>
        </button>
      </div>
    );
  }
}

FilePreview.PropTypes = {
  progress:PropTypes.number,
}



class FileUpload extends Component {
  constructor(props) {
      super(props);
      this.state = {
        fileList: [],
        progress:0
       };
   }

  handleFileSelect(e) {
    const files = e.target.files || e.dataTransfer.files;
    this.files = files;
    const fileList = Object.keys(files).map(file => files[file]);
    this.setState({
      fileList,
      progress:0
    });
  }

  removeItem(index) {
    const fileList = this.state.fileList;
    fileList.splice(index,1);
    this.setState({
      fileList
    });
  }

  uploadFile() {
      if (!this.files) return
      if (!this.props.options.baseUrl) throw new Error('baseUrl missing in options')

      /*组装FormData*/
      let formData = new FormData()
      const bundleId = this.refs.FilePreview.refs.bundle.value;
      /*If we need to add fields before file data append here*/
      formData.append("bundleId", bundleId);

      const fieldNameType = typeof this.fileFieldName

      /*判断是用什么方式作为formdata item 的 name*/
      Object.keys(this.files).forEach(key => {
            if(key == 'length') return
            const file = this.files[key]
            formData.append(file.name, file)
          });

      /*AJAX上传部分*/
      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/upload', true)

      xhr.onreadystatechange = () => {
          /*xhr finish*/
          try {
              if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                  const resp = this.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
                  console.log('upload success..!')
              } else if (xhr.readyState == 4) {
                  /*xhr fail*/
                  const resp = this.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText
                  alert(resp);
              }
          } catch (e) {
              alert(e.message);
          }
      }
      /*xhr error*/
      xhr.onerror = () => {
          try {
              const resp = this.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
              alert(resp);
          } catch (e) {
              alert(e.message);
          }
      }

      const uploadContext = this;
      xhr.onprogress = xhr.upload.onprogress = progress => {
          if (progress.total == 0) {
            return;
          }
          let uploadProgress = progress.loaded/progress.total * 100;
          uploadProgress = parseInt(uploadProgress, 10);
          uploadContext.setState({
            progress:uploadProgress,
          })
          console.log('loading...',uploadProgress+'%');
      }

      xhr.send(formData)

      /*清除input的值*/
      this.refs['ajax_upload_file_input'].value = ''
  }

  previews() {
    if(this.state.fileList.length > 0) {
      return this.state.fileList.map((file, index) => {
        const removeItem = () => {
          this.removeItem(index);
        }
        const uploadFile = () => {
          this.uploadFile(file);
          // this.uploadFile(file).then(()=>{
          //    this.removeFile(file);
          // });
        }

        const progress = this.state.progress;
        return (
          <FilePreview key={index}
                       data={file}
                       onRemove={removeItem}
                       progress={progress}
                       onUpload={uploadFile}
                       ref="FilePreview"/>
        );
      });
    }
    return null;
  }


  render () {
      return (
       <div>
          <div className='btn-toolbar'>
            <button type="button" className="btn" id="upload-file">
              <span>Upload File</span>
              <input id="fileupload" type="file" name="zipfile" ref="ajax_upload_file_input"
              onChange={this.handleFileSelect.bind(this)}/>
            </button>
          </div>
          <div className="preview">{this.previews()}</div>
      </div>
    );
  }
}
FileUpload.propTypes = {
  options: PropTypes.object,
};

export default FileUpload;
