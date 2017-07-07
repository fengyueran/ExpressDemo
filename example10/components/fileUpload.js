import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

class FilePreview extends Component {
  render() {
    // const loading = this.loading(this.state.loading);
    // const uploading = this.loading(this.props.data.loading);
    //
    // const preview = this.preview();

    return (
      <div className="preview-item">
        {// {uploading}
        // {loading}
      }
        <div className="filename-space">{this.props.data.name}</div>
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





class FileUpload extends Component {
  constructor(props) {
      super(props);
      this.state = { fileList: [] };
   }

   componentWillReceiveProps(newProps) {
     console.log('111111');
      // this.updateProps(newProps)
   }

  handleFileSelect(e) {
    const files = e.target.files || e.dataTransfer.files;
    this.files = files;
    const fileList = Object.keys(files).map(file => files[file]);
    this.setState({
      fileList
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
      /*mill参数是当前时刻毫秒数，file第一次进行上传时会添加为file的属性，也可在beforeUpload为其添加，之后同一文件的mill不会更改，作为文件的识别id*/



      if (!this.files) return
      if (!this.props.options.baseUrl) throw new Error('baseUrl missing in options')

      /*用于存放当前作用域的东西*/
      const scope = {}
      /*组装FormData*/
      let formData = new FormData()
      /*If we need to add fields before file data append here*/
      // if(this.textBeforeFiles){
      //    formData = this.appendFieldsToFormData(formData);
      // }


      const baseUrl = this.baseUrl




      const targeturl = baseUrl;

      /*AJAX上传部分*/
      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/upload', true)

      /*处理超时。用定时器判断超时，不然xhr state=4 catch的错误无法判断是超时*/
      // if(this.timeout) {
      //     xhr.timeout = this.timeout
      //     xhr.ontimeout = () => {
      //         this.uploadError({type: 'TIMEOUTERROR', message: 'timeout'})
      //         scope.isTimeout = false
      //     }
      //     scope.isTimeout = false
      //     setTimeout(()=>{
      //         scope.isTimeout = true
      //     },this.timeout)
      // }

      xhr.onreadystatechange = () => {
          /*xhr finish*/
          try {
              if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                  const resp = this.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText
                //  this.uploadSuccess(resp)
              } else if (xhr.readyState == 4) {
                  /*xhr fail*/
                  const resp = this.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText
                  // this.uploadFail(resp)
              }
          } catch (e) {
              /*超时抛出不一样的错误，不在这里处理*/
              !scope.isTimeout && this.uploadError({type: 'FINISHERROR', message: e.message})
          }
      }
      /*xhr error*/
      xhr.onerror = () => {
          try {
              const resp = this.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText
            //  this.uploadError({type: 'XHRERROR', message: resp})
          } catch (e) {
            //  this.uploadError({type: 'XHRERROR', message: e.message})
          }
      }
      /*这里部分浏览器实现不一致，而且IE没有这个方法*/
      xhr.onprogress = xhr.upload.onprogress = progress => {
        console.log(progress);
        //  this.uploading(progress, mill)
      }

      xhr.send(formData)


      /*trigger执行上传的用户回调*/
    //  this.doUpload(this.files, mill, currentXHRID)

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


        return (
          <FilePreview key={index}
                       data={file}
                       onRemove={removeItem}
                       onUpload={uploadFile}/>
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
              <input id="fileupload" type="file" name="zipfile"
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
