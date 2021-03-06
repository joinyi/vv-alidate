### 提交前验证示例

- 使用对象字面量

**v-verify** 提供了和自定义属性 `data-verify-*` 一对一的字面量属性

<vuep template="#demo3"></vuep>

<script v-pre type="text/x-template" id="demo3">
  <style>
    .text {
      color: #4fc08d;
    }
  </style>

  <template>
    <div>
      <div>
        <label>日期</label>
        <p>
          <input class="example-input"
                v-verify.input.blur="{
                  regs: 'required|date:YYYY/MM/DD',
                  submit: 'demo3',
                  name: '日期'
                }"
                placeholder="YYYY/MM/DD"/>
        </p>
      </div>

      <div>
        <label>电话</label>
        <p>
          <input class="example-input"
                v-verify.input.blur="{
                  regs: 'required|numberic|len:11|max:11',
                  submit: 'demo3',
                  name: '电话'
                }"
                placeholder="电话"/>
        </p>
      </div>

      <div>
        <label>姓名</label>
        <p>
          <input class="example-input"
                v-verify.input.blur="{
                  regs: 'required',
                  submit: 'demo3',
                  name: '姓名'
                }"
                placeholder="姓名"/>
        </p>
      </div>

      <div>
        <button class="example-btn example-btn_default"
                @click="submitData">
          提交
        </button>
      </div> 
    </div>
  </template>

  <script>
    module.exports = {
      data () {
        return {
          time: '2017/09/09'
        }
      },
      methods: {
        submitData() {
          const result = this.$validator.verifyAll('demo3')
          if (result.indexOf(false) > -1) {
            // alert('抱歉！请按指定格式填写')
          } else {
            alert('填写成功')
          }
        }
      }
    }
  </script>
</script>


- 使用自定义属性

<vuep template="#demo2"></vuep>

<script v-pre type="text/x-template" id="demo2">
  <style>
    .text {
      color: #4fc08d;
    }
  </style>

  <template>
    <div>
      <div>
        <label>日期</label>
        <p>
          <input class="example-input"
                v-verify.input.blur="'required|date:YYYY-MM-DD'"
                data-verify-submit="demo2"
                placeholder="YYYY-MM-DD"/>
        </p>
      </div>

      <div>
        <label>电话</label>
        <p>
          <input class="example-input"
                data-verify-name="电话"
                v-verify.input.blur="'required|numberic|len:11|max:11'"
                data-verify-submit="demo2"
                placeholder="电话"/>
        </p>
      </div>

      <div>
        <label>姓名</label>
        <p>
          <input class="example-input"
                v-verify.input.blur="'required'"
                data-verify-submit="demo2"
                placeholder="姓名"/>
        </p>
      </div>

      <div>
        <button class="example-btn example-btn_default"
                @click="submitData">
          提交
        </button>
      </div>
    </div>
  </template>

  <script>
    module.exports = {
      data () {
        return {
          time: '2017/09/09'
        }
      },
      methods: {
        submitData() {
          const result = this.$validator.verifyAll('demo2')
          if (result.indexOf(false) > -1) {
            alert(`抱歉！请按指定格式填写${result.join(' | ')}`)
          } else {
            alert(`填写成功${result.join(' | ')}`)
          }
        }
      }
    }
  </script>
</script>

- 使用 `tip` 模式的提示

<vuep template="#demo4"></vuep>

<script v-pre type="text/x-template" id="demo4">
  <style>
    .text {
      color: #4fc08d;
    }
  </style>

  <template>
    <div>
      <div>
        <label>日期</label>
        <p>
          <input class="example-input"
                v-verify.input.blur="{
                  regs: 'required|date:YYYY/MM/DD',
                  submit: 'demo4',
                  mode: 'tip',
                  name: '日期'
                }"
                placeholder="YYYY/MM/DD"/>
        </p>
      </div>

      <div>
        <label>电话</label>
        <p>
          <input class="example-input"
                v-verify.input.blur="{
                  regs: 'required|numberic|len:11',
                  submit: 'demo4',
                  mode: 'tip',
                  name: '电话'
                }"
                placeholder="电话"/>
        </p>
      </div>

      <div>
        <label>姓名</label>
        <p>
          <input class="example-input"
                v-verify.input.blur="{
                  regs: 'required',
                  submit: 'demo4',
                  mode: 'tip',
                  name: '姓名'
                }"
                placeholder="姓名"/>
        </p>
      </div>

      <div>
        <button class="example-btn example-btn_default"
                @click="submitData">
          提交
        </button>
      </div> 
    </div>
  </template>

  <script>
    module.exports = {
      data () {
        return {
          time: '2017/09/09'
        }
      },
      methods: {
        submitData() {
          const result = this.$validator.verifyAll('demo4')
          if (result.indexOf(false) > -1) {
            // alert('抱歉！请按指定格式填写')
          } else {
            alert('填写成功')
          }
        }
      }
    }
  </script>
</script>

### 使用说明

使用 `v-verify` 进行表单验证非常简单，你不需要再重新写一遍验证逻辑，只需2步即可实现
 - 在需要验证的表单上加自定义属性 `data-verify-submit` 并且必须赋值

 ```html
 <input class="example-input"
        v-verify.input.blur="'required|date'"
        data-verify-submit="demo2"
        placeholder="yyyy-mm-dd"/>
 ```

> *注意* 这里的 `demo2` 是必须的，它的作用相当于分组

- 在提交时调用 `vue.$validator.verifyAll(type)` 方法，其中type值即data-verify-dom的赋值 `demo2`

```javascript
  methods: {
    submitData() {
      const result = this.$validator.verifyAll('demo2')
      if (result.indexOf(false) > -1) {
        alert('抱歉！请按指定格式填写')
      } else {
        alert('填写成功')
      }
    }
  }
```

> *注意* 这里的 `result` 返回布尔数组 [false, true, false]