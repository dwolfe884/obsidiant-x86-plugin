/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => MyPlugin
});
module.exports = __toCommonJS(src_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  mySetting: "default"
};
var MyPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    const ribbonIconEl = this.addRibbonIcon("dice", "Sample Plugin", (evt) => {
      new import_obsidian.Notice("This is a notice!");
    });
    ribbonIconEl.addClass("my-plugin-ribbon-class");
    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText("Status Bar Text");
    this.addCommand({
      id: "run-x86-parser",
      name: "Parse x86 Codeblocks",
      callback: () => {
        var tmp = document.getElementsByClassName("HyperMD-codeblock-begin-bg");
        for (var i = 0; i < tmp.length; i++) {
          if (tmp[i].innerHTML.contains("x86")) {
            tmp[i].classList.add("x86-instruction");
            var currelement = tmp[i];
            while (!currelement.classList.value.contains("HyperMD-codeblock-end")) {
              currelement.classList.add("x86-instruction");
              if (currelement.nextElementSibling != null) {
                currelement = currelement.nextElementSibling;
                if (currelement.classList.value.contains("HyperMD-codeblock-end")) {
                  break;
                }
              } else {
                console.log("end of document reached before end of codeblock");
                break;
              }
              var orightml = currelement.innerHTML;
              var innerpart = orightml.split(">")[1].split("<")[0];
              var firstspace = innerpart.indexOf(" ");
              var innerpart = '<span class="cm-hmd-codeblock x86-instruction">' + innerpart.split(" ")[0] + "</span>" + innerpart.slice(firstspace, innerpart.length);
              var testing = orightml.split(">")[0] + ">" + innerpart + "<" + orightml.split(">")[1].split("<")[1];
              currelement.innerHTML = testing;
              console.log(currelement.innerHTML);
            }
            console.log("Done with that x86 codeblock");
          }
        }
      }
    });
    this.addCommand({
      id: "create-flow-diagram",
      name: "Convert x86 assembly into a flow diagram on a canvas",
      editorCallback: (editor, view) => {
        console.log(editor.getSelection());
        console.log(this.app.vault.getName());
        let nodes = [];
        var tmp = editor.getSelection().split("\n");
        let lines = [];
        var nodeid = 1;
        var workingx = 0;
        var workingy = 0;
        tmp.forEach((element) => {
          if (element != "") {
            lines.push(element);
          }
        });
        var currnode = "```\n";
        lines.forEach((line, linenum) => {
          console.log(line);
          if (line.split("")[0] == "	" || line.split("")[0] == " ") {
            if (line.trim().split("")[0] == "j") {
              currnode = currnode + line + "```";
              nodes.push({ "id": nodeid, "x": workingx, "y": workingy, "width": 250, "height": 300, "type": "text", "text": currnode });
              nodeid = nodeid + 1;
              workingy = workingy + 350;
              currnode = "```\n";
            } else {
              currnode = currnode + line + "\n";
            }
          } else {
          }
        });
        var thing = '{ "nodes":' + JSON.stringify(nodes) + "}";
        console.log(thing);
        this.app.vault.create("./testing.canvas", thing);
      }
    });
    this.addCommand({
      id: "open-sample-modal-complex",
      name: "Open sample modal (complex)",
      checkCallback: (checking) => {
        const markdownView = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
        if (markdownView) {
          if (!checking) {
            new SampleModal(this.app).open();
          }
          return true;
        }
      }
    });
    this.addSettingTab(new SampleSettingTab(this.app, this));
    this.registerDomEvent(document, "click", (evt) => {
      console.log("click1", evt);
    });
    this.registerInterval(window.setInterval(() => console.log("setInterval"), 5 * 60 * 1e3));
  }
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var SampleModal = class extends import_obsidian.Modal {
  constructor(app) {
    super(app);
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.setText("Woah!");
  }
  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
};
var SampleSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Settings for my awesome plugin." });
    new import_obsidian.Setting(containerEl).setName("Setting #1").setDesc("It's a secret").addText((text) => text.setPlaceholder("Enter your secret").setValue(this.plugin.settings.mySetting).onChange(async (value) => {
      console.log("Secret: " + value);
      this.plugin.settings.mySetting = value;
      await this.plugin.saveSettings();
    }));
  }
};
