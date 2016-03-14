#define CUSTOM_FRAG
uniform vec3 uLightDir;
uniform vec3 uColor;
uniform int view;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vViewPosition;

#define PI 3.14159
#define PI2 6.28318
#define RECIPROCAL_PI2 0.15915494
#define LOG2 1.442695
#define EPSILON 1e-6

#define saturate(a) clamp( a, 0.0, 1.0 )
#define whiteCompliment(a) ( 1.0 - saturate( a ) )

void main() {

    if ( view == 1 && vPosition.z > 0.0 ) discard;
    else if ( view == 2 && vPosition.z < 0.0 ) discard;
    else if ( view == 3 && vPosition.y > 0.0 ) discard;
    else if ( view == 4 && vPosition.y < 0.0 ) discard;
    else if ( view == 5 && vPosition.x > 0.0 ) discard;
    else if ( view == 6 && vPosition.x < 0.0 ) discard;

    vec4 lDirection = viewMatrix * vec4( uLightDir, 0.0 );
    vec3 lVector = normalize( lDirection.xyz );

    vec3 normal = normalize( vNormal );

    float diffuse = abs( dot( normal, lVector ) );

    gl_FragColor.rgb = uColor * diffuse;

}