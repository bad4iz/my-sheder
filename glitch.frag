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

    float y = abs(st.x);


    // Plot a line
    float pct = plot(st, y);

    vec4 texColor = texture2D(u_texture, st);
//    vec4 video = texture2D(u_video, vec2(st.x + abs(st.x  + cos( u_time * 2.0) / 22.), abs(st.x  + cos( u_time * 2.0) / 22.) + abs(st.y  + sin( u_time * 20.0) / 22.)));
    vec4 video = texture2D(u_video, st*2.0 - _mouse );


    vec3 color = vec3(y);

    if( video.g > .5 && video.r < .5 && video.b < .5){

        video = texColor;

    }

	gl_FragColor = video;
}