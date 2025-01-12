var newsContentTemplate = Handlebars.compile(`
  <div class="card-container">

    <h2 style="margin-left: 5px;">News from {{region}} <svg class="section-title" width="24" height="24" viewBox="0 0 24 24" focusable="false"><path d="M7.59 18.59L9 20l8-8-8-8-1.41 1.41L14.17 12"></path></svg></h2>

    {{#each articles}}
      <sl-card class="card-overview" onclick="openLink('{{link}}')">
        
        <div class="card-hero" style="background-image: url({{image}})">
          <!--div class="card-tags">
            {{#each tags}}
              <sl-badge>{{this}}</sl-badge>
            {{/each}}
          </div-->
        </div>
      
        <div>
          <br />
          <img src="{{icon}}" width="14" />  <strong>{{source}}</strong>
        </div>

        <div>
          <small>{{location}}</small>
        </div>
        <br />

        <div class="card-title">
          {{title}}
        </div>
        <br />
        
        <small>{{published}}</small>
      
        <!--div slot="footer">
          <sl-button variant="primary" pill>More Info</sl-button>
        </div-->
      </sl-card>
    {{/each}}
  </div>

`);

