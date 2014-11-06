import Ember from "ember";
import FileBucket from "./file_bucket";

var get = Ember.get;
var set = Ember.set;

var FileUploadManager = Ember.Object.extend(/** @scope FileUploadManager.prototype */{

  /**
    @private
    Setup a map of uploaders so they may be
    accessed by name via the `find` method.
   */
  init: function () {
    set(this, 'uploaders', Ember.Map.create());
  },

  /**
    Return or instantiate a new plupload instance
    for a file uploader.

    @method find
    @param {String} name The name of the uploader to find
    @param {Object} [config] The configuration to use for the uploader
   */
  find: function (name, config) {
    var uploader;

    if (get(this, 'uploaders').has(name)) {
      uploader = get(this, 'uploaders').get(name);
      if (config != null) {
        uploader.makeQueue(config);
      }
    } else {
      uploader = FileBucket.create({
        name: name,
        context: config.context,
        onQueued: config.on_queued,
        onUpload: config.on_upload,
        onError: config.on_error,
        target: get(this, 'router')
      });
      get(this, 'uploaders').set(name, uploader);
      uploader.makeQueue(config);
    }
    return uploader;
  }
});

export default FileUploadManager;