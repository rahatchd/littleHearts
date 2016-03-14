#define CUSTOM_VERT
uniform vec3 uColor;
uniform vec3 uLightDir;
varying vec3 vNormal;
varying vec3 vPosition;

#define PI 3.14159
#define PI2 6.28318
#define RECIPROCAL_PI2 0.15915494
#define LOG2 1.442695
#define EPSILON 1e-6

#define saturate(a) clamp( a, 0.0, 1.0 )
#define whiteCompliment(a) ( 1.0 - saturate( a ) )

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    vPosition = ( modelMatrix * vec4( position, 1.0 ) ).xyz;

    vNormal = normalize( normalMatrix * normal );
}