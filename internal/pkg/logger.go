package pkg

import (
	"github.com/rs/zerolog"
)

// Logger is an interface that all loggers in the application must implement.
type Logger interface {
	Debug(msg string)
	Info(msg string)
	Warn(msg string)
	Error(msg string)
	Fatal(msg string)
}

// ZerologLogger is a concrete implementation of the Logger interface.
type ZerologLogger struct {
	logger zerolog.Logger
}

func NewZerologLogger(logger zerolog.Logger) *ZerologLogger {
	return &ZerologLogger{
		logger: logger,
	}
}

func (l *ZerologLogger) Debug(msg string) {
	l.logger.Debug().Msg(msg)
}

func (l *ZerologLogger) Info(msg string) {
	l.logger.Info().Msg(msg)
}

func (l *ZerologLogger) Warn(msg string) {
	l.logger.Warn().Msg(msg)
}

func (l *ZerologLogger) Error(msg string) {
	l.logger.Error().Msg(msg)
}

func (l *ZerologLogger) Fatal(msg string) {
	l.logger.Fatal().Msg(msg)
}
