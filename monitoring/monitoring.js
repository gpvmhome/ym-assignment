const MeterRegistry = require('@opentelemetry/metrics').MeterRegistry;
const PrometheusExporter  = require('@opentelemetry/exporter-prometheus').PrometheusExporter;

const meter  = new MeterRegistry().getMeter('node-crud');
const prometheusPort = 8081;

const exporter = new PrometheusExporter(
    {
      startServer: true,
      port: prometheusPort
    },
    () => {
      console.log("prometheus scrape endpoint: http://localhost:"
        + prometheusPort 
        + "/metrics");
    }
  );

  meter.addExporter(exporter);

module.exports.requestCount = meter.createCounter("request_count", {
    monotonic: true,
    labelKeys: ["metricOrigin"],
    description: "Counts total number of requests"
  });

module.exports.labels = meter.labels({ metricOrigin: process.env.APP});


