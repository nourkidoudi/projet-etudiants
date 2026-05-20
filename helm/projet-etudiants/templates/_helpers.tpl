{{/*
Expand the name of the chart.
*/}}
{{- define "projet-etudiants.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "projet-etudiants.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "projet-etudiants.labels" -}}
helm.sh/chart: {{ include "projet-etudiants.chart" . }}
{{ include "projet-etudiants.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "projet-etudiants.selectorLabels" -}}
app.kubernetes.io/name: {{ include "projet-etudiants.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
