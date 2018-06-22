#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_texture;
uniform sampler2D u_video;
uniform vec2 u_textureResolution;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

float random (vec2 st){
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.545454522);
}

void main() {
    vec2 uv = u_textureResolution;
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec2 _mouse = u_mouse/u_resolution;

//    float y = st.x;

//    float y = step(0.5,st.x);
//    float y = smoothstep(0.1,0.7,st.x);
    float y = abs(st.x);


    // Plot a line
    float pct = plot(st, y);

    vec4 texColor = texture2D(u_texture, st);
    vec4 video = texture2D(u_video, st);

//    if( _mouse.x >= st.x  - 0.01 && _mouse.x <= st.x +0.01 && _mouse.y >= st.y  - 0.01 && _mouse.y <= st.y +0.01){
//        texColor.g=1.0;
//        texColor.r=1.0;
//        texColor.b=1.0;
//    };
//    texColor.g = texColor.r;
//    texColor.r = abs(sin(u_time));

    vec3 color = vec3(y);

    if( video.g > .5 && video.r < .5){

        video = texColor;

    }

	gl_FragColor = video;
}